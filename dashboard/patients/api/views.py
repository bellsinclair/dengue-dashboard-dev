# [OWN_DD]
# Author: Jennifer Horstmann

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from rest_framework.viewsets import ModelViewSet

from django_filters.rest_framework import DjangoFilterBackend
from background_task import background
from dashboard.patients.api.serializers import PatientSerializer, ReportSerializer, ReportHistorySerializer

from dashboard.patients.models import Patient, Report
import dateutil.parser
from datetime import timedelta, datetime

from background_task.models import Task
from django.utils import timezone




class PatientViewSet(ModelViewSet):
    """
    This view returns a list of all patients in the systems
    ordered by their admission date.
    """
    serializer_class = PatientSerializer

    def get_queryset(self):
        queryset = Patient.objects.all()
        queryset = queryset.order_by('-admission_date')
        return queryset


class ReportViewSet(ModelViewSet):
    """
    This view returns a list of all reports and their respective histories in the system.
    The reports can be filtered by their status with a query in the url like so:
    /api/reports/?status=ok
    """
    serializer_class = ReportSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']

    def get_queryset(self):
        queryset = Report.objects.all()
        queryset_history = Report.history.model.objects.all()
        patient = self.request.query_params.get('patient', None)
        if patient is not None:
            queryset = queryset.filter(patient=patient)
            queryset = queryset.order_by('-id')
        return queryset


class ReportHistoryViewSet(ModelViewSet):
    """
    This view returns a list of all history objects in the system.
    """
    queryset = Report.history.model.objects.all()
    serializer_class = ReportHistorySerializer
    lookup_field = 'history_id'


@background(remove_existing_tasks=True)
def calc_fever(message):
    instance = Report.objects.get(id=message['id'])
    serializer = ReportSerializer(instance).data
    channel_layer = get_channel_layer()

    if len(serializer['history']) > 2:

        sorted_obj = dict(serializer)
        sorted_obj['history'] = sorted(serializer['history'], key=lambda x: x['datetime'], reverse=False)

        unique = []
        for entry in sorted_obj['history']:
            date = dateutil.parser.parse(entry['datetime']).date()
            if date in unique:
                continue
            else:
                unique.append(date)

        if len(unique) > 2:
            con_days = []
            con_days.append(unique[0])
            for date in unique[1:]:
                if (date - timedelta(days=1)) in unique:
                    con_days.append(date)

            if len(con_days) >= 2:
                fever_days = []
                for day in con_days:
                    filtered_days = [obj for obj in sorted_obj['history'] if
                                     (dateutil.parser.parse(obj['datetime']).date() == day)]
                    max_fever = max([obj['fever'] for obj in filtered_days])
                    max_fever_day = [obj for obj in filtered_days if (max(obj['fever']))]
                    fever_days.append(max_fever_day[0])

                current_day = [obj for obj in sorted_obj['history'] if
                               (dateutil.parser.parse(obj['datetime']).date() == unique[-1:][0])]
                if all([float(entry['fever']) >= 38.0 for entry in fever_days[:-1]]) and float(
                    current_day[0]['fever']) <= 37.5:
                    async_to_sync(channel_layer.group_send)(
                        "history", {"type": "notify.me",
                                    "text": message,
                                    "report": serializer,
                                    "reason": "fever"
                                    }
                    )


@background(remove_existing_tasks=True)
def notify_user(message):
    instance = Report.objects.get(id=message['id'])
    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        "history", {"type": "notify.me",
                    "text": message,
                    "report": ReportSerializer(instance).data,
                    "reason": "interval"
                    }
    )
