# [OWN_DD]
# Author: Jennifer Horstmann

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from dashboard.patients.api.views import ReportViewSet, PatientViewSet, ReportHistoryViewSet

router = DefaultRouter()
router.register(r"patients", PatientViewSet, basename="patients")
router.register(r"reports", ReportViewSet, basename="reports")
router.register(r"history", ReportHistoryViewSet, basename="history")

urlpatterns = [
    path("", include(router.urls)),
]
