from django.urls import include, re_path

# from django.contrib import admin
from django.views.generic import RedirectView, TemplateView

from smoketest.admin import admin_site

urlpatterns = [
    re_path(r"^api/", include("api.urls")),
    re_path(r"^api$", RedirectView.as_view(url="/api/")),
    re_path(r"^admin/", admin_site.urls),
    re_path(r"^admin$", RedirectView.as_view(url="/admin/")),
    # Whitenoise cannot serve a static index for the website root root URL.
    # See also settings.TEMPLATES
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
