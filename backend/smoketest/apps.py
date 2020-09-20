from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class SmokeTestAdminConfig(AdminConfig):
    default_site = "smoketest.admin.SmokeTestAdmin"


class SmokeTestAppConfig(AppConfig):
    name = "smoketest"
