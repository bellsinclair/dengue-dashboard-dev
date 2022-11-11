# [OWN_DD]
# Author: Jennifer Horstmann

from datetime import datetime
from dashboard.users.models import User
from django.db import models
from model_utils.fields import MonitorField
from simple_history.models import HistoricalRecords


class Patient(models.Model):
    """
    Patient instance.
    """
    first_name = models.CharField(max_length=240)
    last_name = models.CharField(max_length=240)
    admission_date = models.DateTimeField()
    dismissal_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        get_latest_by = "admission_date"
        ordering = ["admission_date"]

    def __str__(self):
        date = self.admission_date.strftime("%Y/%m/%d")
        return (self.first_name) + " " + (self.last_name)


class Report(models.Model):
    """
    Report instance. The history of the report is to be found in the field "history".
    """
    patient = models.OneToOneField(
        Patient, on_delete=models.CASCADE, related_name="reports")
    daytime = models.CharField(max_length=1, blank=False, choices=[
        ('D', 'D'), ('E', 'E'), ('N', 'N')], default='D')  # D, E, N
    datetime = models.DateTimeField(blank=True, null=True, default=datetime.now)
    day_of_fever = models.PositiveIntegerField(blank=True, null=True)
    fever = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=2)
    pulse = models.PositiveIntegerField(blank=True, null=True)
    respiration = models.IntegerField(blank=True, null=True)
    # Blood Pressure
    bp_sys = models.PositiveIntegerField(blank=True, null=True)
    bp_dia = models.PositiveIntegerField(blank=True, null=True)
    # Fluid Input
    fluid_input = models.PositiveIntegerField(blank=True, null=True)
    fi_oral = models.PositiveIntegerField(blank=True, null=True, verbose_name='oral')
    fi_parenteral = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='parenteral')
    fi_other = models.PositiveIntegerField(blank=True, null=True, verbose_name='other')
    fi_eight_hrs = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='in 8 hours')
    fi_total = models.PositiveIntegerField(blank=True, null=True, verbose_name='total')
    # Fluid Output
    fluid_output = models.PositiveIntegerField(blank=True, null=True)
    fo_urine = models.PositiveIntegerField(blank=True, null=True, verbose_name='urine')
    fo_uf = models.PositiveIntegerField(blank=True, null=True, verbose_name='uf')
    fo_emesis = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='emesis')
    fo_drainage = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='drainage')
    fo_eight_hrs = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='in 8 hours')
    fo_total = models.PositiveIntegerField(blank=True, null=True, verbose_name='total')
    # misc
    diet = models.CharField(max_length=1000, blank=True, null=True)
    pain_score = models.PositiveIntegerField(blank=True, null=True)
    abd_cir = models.PositiveIntegerField(blank=True, null=True)
    stools = models.PositiveIntegerField(blank=True, null=True)
    urine = models.PositiveIntegerField(blank=True, null=True)
    weight_ht = models.PositiveIntegerField(
        blank=True, null=True, verbose_name='weight/ht')
    weight = models.DecimalField(blank=True, null=True, max_digits=4, decimal_places=2)
    height = models.PositiveIntegerField(blank=True, null=True, verbose_name='height')
    o2sat = models.PositiveIntegerField(blank=True, null=True, verbose_name="O2 Saturation")
    hematocrit = models.PositiveIntegerField(blank=True, null=True)
    platelet = models.PositiveIntegerField(blank=True, null=True)
    wbc = models.PositiveIntegerField(blank=True, null=True)
    warning_signs = models.CharField(max_length=1000, blank=True, null=True, verbose_name="Warning Signs")
    additional = models.CharField(max_length=1000, blank=True, null=True, verbose_name="Additional Info")
    medical_advice = models.CharField(max_length=1000, blank=True, null=True, verbose_name="Medical Advice")
    status = models.CharField(blank=True, null=True, max_length=20, choices=[
        ('febrile', 'febrile'), ('critical', 'critical'), ('recovery', 'recovery')])
    status_changed_to_critical = MonitorField(
        monitor='status', when=['critical'], editable=False)
    monitoring_interval = models.SmallIntegerField(blank=True, null=True, choices=[
        (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6)])
    history = HistoricalRecords(user_model=User, related_name="logs")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    changed_by = models.ForeignKey(
        User, null=True, on_delete=models.CASCADE)

    class Meta:
        get_latest_by = "datetime"
        ordering = ["datetime"]

    def __str__(self):
        return "Report of Patient: " + str(self.patient)

    @property
    def _history_user(self):
        return self.changed_by

    @_history_user.setter
    def _history_user(self, value):
        self.changed_by = value
