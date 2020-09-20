from django.contrib import admin
from django.conf.urls import url

from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView

from smoketest.views import AdminSiteView, EmailSmokeTestView, SentrySmokeTestView


class SmokeTestAdmin(admin.AdminSite):
    index_template = "admin/admin_site_index.html"
    site_header = "Django-Angular Boilerplate admin"
    site_title = "Django-Angular Boilerplate"

    def get_urls(self):
        url_list = super().get_urls()
        custom_urls = [
            url(
                r"admin/smoke-test/$",
                self.admin_view(
                    AdminSiteView.as_view(
                        admin_site=self, template_name="admin/smoke_test_index.html"
                    ),
                ),
                name="smoke_test_index",
            ),
            url(
                r"admin/smoke-test/email/$",
                self.admin_view(EmailSmokeTestView.as_view(admin_site=self)),
                name="smoke_test_email",
            ),
            url(
                r"admin/smoke-test/sentry/$",
                self.admin_view(SentrySmokeTestView.as_view(admin_site=self)),
                name="smoke_test_sentry",
            ),
        ]
        return custom_urls + url_list


admin_site = SmokeTestAdmin()
