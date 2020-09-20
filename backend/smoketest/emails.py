import logging

from django.core.mail import mail_admins, mail_managers, send_mail
from django.core.exceptions import ImproperlyConfigured
from django.conf import settings

logger = logging.getLogger(__name__)


def send_admin_email():
    if not settings.ADMINS:
        raise ImproperlyConfigured("No admins configured")
    mail_admins(
        "Smoke test - admins",
        "This smoke test for admins was generated via the Django Admin.",
    )


def send_manager_email():
    if not settings.MANAGERS:
        raise ImproperlyConfigured("No managers configured")
    mail_managers(
        "Smoke test - managers",
        "This smoke test for managers was generated via the Django Admin.",
    )


def send_user_email(recipient_email):
    send_mail(
        "Smoke test - user",
        "This smoke test for users was generated via the Django Admin.",
        settings.DEFAULT_FROM_EMAIL,
        (recipient_email,),
    )
