# [OWN_DD]
# Author: Jennifer Horstmann

from asgiref.sync import sync_to_async
from djangochannelsrestframework import permissions
from djangochannelsrestframework.consumers import AsyncAPIConsumer
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    PatchModelMixin,
    DeleteModelMixin,
    CreateModelMixin,
)
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.observer.generics import ObserverModelInstanceMixin

from dashboard.patients.api.serializers import PatientSerializer, ReportSerializer, ReportHistorySerializer
from dashboard.patients.api.views import notify_user, calc_fever
from dashboard.patients.models import Patient, Report

import dateutil.parser
from datetime import timedelta, datetime, timezone
from django.utils.timezone import make_aware


class HistoryConsumerObserver(AsyncAPIConsumer):

    async def accept(self, **kwargs):
        await self.channel_layer.group_add(
            "history",
            self.channel_name
        )
        await super().accept(**kwargs)
        await self.history_change.subscribe()

    @model_observer(Report.history.model)
    async def history_change(self, message, **kwargs):
        """
        Observes changes of the history model instances.
        In case of a DELETE event the consumer is notified with an information about the deleted instance.
        In all other cases the consumer is notified about the update of the instance.
        If possible background tasks to send notifications are being triggered.
        :param message: The request/message from the consumer
        :param kwargs: Optional keyword arguments
        :return: The above stated websocket messages in json format to the consumer
        """
        if message['datetime'] and message['fever']:
            await sync_to_async(calc_fever)(message=message,
                                            schedule=(make_aware(datetime.now()) + timedelta(
                                                seconds=1)))

        if message['datetime'] and message['monitoring_interval']:
            time = message['datetime']
            interval = message['monitoring_interval']
            # TODO for demonstrating purposes minutes instead of hours
            schedule = dateutil.parser.parse(time) + timedelta(minutes=int(interval))
            # only send notifications that are scheduled for the future
            if schedule > datetime.now(timezone.utc):
                print ("yes", schedule)
                await sync_to_async(notify_user)(message=message, schedule=schedule)

        await self.send_json(message)

    @history_change.serializer
    def history_serializer(self, instance, action, **kwargs):
        """
        Serializes the history instance to be sent in json format to the consumer.
        :param instance: The history instance
        :param action: Create, update, patch, list, delete
        :param kwargs: Optional keyword arguments
        :return: The serialized history instance
        """
        return ReportHistorySerializer(instance).data

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("history", self.channel_name)
        await self.close()


class ReportConsumerObserver(AsyncAPIConsumer):
    async def accept(self, **kwargs):
        await super().accept(**kwargs)
        await self.report_change.subscribe()

    @model_observer(Report)
    async def report_change(self, message, **kwargs):
        await self.send_json(message)

    def get_report(self, message, **kwargs):
        return (Report.objects.get)(pk=message['pk'])


class PatientConsumerObserver(AsyncAPIConsumer):

    async def accept(self, **kwargs):
        await super().accept(**kwargs)
        await self.patient_change.subscribe()

    @model_observer(Patient)
    async def patient_change(self, message, **kwargs):
        """
        Observes changes of the patient model instances.
        :param message: The request/message from the consumer
        :param kwargs: Optional keyword arguments
        :return: Information about the change event via websocket messages in json format to the consumer
        """
        await self.send_json(message)

    @patient_change.serializer
    def patient_serializer(self, instance, action, **kwargs):
        """ Serializes the patient instance to be sent in json format to the consumer.
        :param instance: The patient instance
        :param action: Create, update, patch, list, delete
        :param kwargs: Optional keyword arguments
        :return: The serialized history instance
        """
        return PatientSerializer(instance).data


class PatientConsumer(ObserverModelInstanceMixin, ListModelMixin, RetrieveModelMixin, PatchModelMixin, UpdateModelMixin,
                      CreateModelMixin,
                      DeleteModelMixin, GenericAsyncAPIConsumer, PatientConsumerObserver):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ReportConsumer(ObserverModelInstanceMixin, ListModelMixin, RetrieveModelMixin, PatchModelMixin, CreateModelMixin,
                     UpdateModelMixin,
                     DeleteModelMixin, GenericAsyncAPIConsumer, AsyncAPIConsumer):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (permissions.IsAuthenticated,)


class HistoryConsumer(ObserverModelInstanceMixin, ListModelMixin, RetrieveModelMixin, PatchModelMixin, UpdateModelMixin,
                      DeleteModelMixin, GenericAsyncAPIConsumer, HistoryConsumerObserver):
    queryset = Report.history.model.objects.all()
    serializer_class = ReportHistorySerializer
    permission_classes = (permissions.IsAuthenticated,)

    async def notify_me(self, event):
        """ Sends a notification to the websocket consumer.
        """
        await self.send_json(
            {"type": "notification", "data": {"patient": (event['text'])['patient'], "type": event['reason']}})
