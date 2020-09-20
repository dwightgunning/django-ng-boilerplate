from django.conf.urls import include, url

from django.contrib import admin
from django.views.generic import RedirectView, TemplateView

from smoketest.admin import admin_site

urlpatterns = [
    url(r"^api/", include("api.urls")),
    url(r"^api$", RedirectView.as_view(url="/api/")),
    # url(r"^admin/", admin.site.urls),
    url(r"^admin/", admin_site.urls),
    url(r"^admin$", RedirectView.as_view(url="/admin/")),
    # Whitenoise cannot serve a static index for the website root root URL.
    # See also settings.TEMPLATES
    url(r"^.*$", TemplateView.as_view(template_name="index.html")),
]
