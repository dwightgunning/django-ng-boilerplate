from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.APIRootView.as_view(), name='APIRootView'),
]
