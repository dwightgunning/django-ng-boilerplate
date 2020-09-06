from django.apps import AppConfig


class ApiConfig(AppConfig):
    name = "api"

    def ready(self):
        # Dynamically set user.email unique for Django admin
        from django.contrib.auth import get_user_model

        get_user_model()._meta.get_field("email")._unique = True
