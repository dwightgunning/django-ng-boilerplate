import logging

from django.contrib import messages
from django.core.exceptions import ImproperlyConfigured, ValidationError
from django.core.validators import validate_email
from django.shortcuts import render
from django.views.generic import TemplateView

from smoketest.interfaces import capture_exception_with_sentry
from smoketest.emails import send_admin_email, send_manager_email, send_user_email

logger = logging.getLogger(__name__)


class AdminSiteView(TemplateView):
    admin_site = None

    def dispatch(self, *args, **kwargs):
        self.request.current_app = self.admin_site.name
        return super().dispatch(*args, **kwargs)

    def get_context_data(self, **kwargs):
        return {
            **{"title": "Smoke test", "app_label": "Smoke test"},  # TODO: Fix this up
            **super().get_context_data(**kwargs),
            **self.admin_site.each_context(self.request),
        }


class EmailSmokeTestView(AdminSiteView):
    template_name = "admin/smoke_test_email.html"

    def post(self, request, *args, **kwargs):
        email_type = request.POST["emailType"]

        try:
            if email_type == "admins":
                send_admin_email()
                messages.add_message(
                    request,
                    messages.SUCCESS,
                    "A test email has been sent to the admins",
                )
            elif email_type == "managers":
                send_manager_email()
                messages.add_message(
                    request,
                    messages.SUCCESS,
                    "A test email has been sent to the managers",
                )
            elif email_type == "user":
                recipient_email = request.POST.get("recipient")
                validate_email(recipient_email)
                send_user_email(recipient_email)
                messages.add_message(
                    request, messages.SUCCESS, "A test email has been sent to the user"
                )
            else:
                messages.add_message(
                    request, messages.ERROR, "Unable to process form data."
                )
        except ImproperlyConfigured as ice:
            logger.exception("An error occurred while sending the email.")
            messages.add_message(request, messages.ERROR, str(ice))
        except Exception as exc:
            logger.exception("An error occurred while sending the email.")
            messages.add_message(
                request, messages.ERROR, "An error occurred while sending the email."
            )
        return render(request, self.template_name, self.get_context_data())


class SentrySmokeTestView(AdminSiteView):
    template_name = "admin/smoke_test_sentry.html"

    def post(self, request, *args, **kwargs):
        try:
            capture_exception_with_sentry()
            messages.add_message(
                request,
                messages.SUCCESS,
                "A test exception has been captured with Sentry",
            )
        except Exception:
            messages.add_message(
                request,
                messages.ERROR,
                "An error occurred while attempting to capture a test exception with Sentry",
            )

        return render(request, self.template_name, self.get_context_data())
