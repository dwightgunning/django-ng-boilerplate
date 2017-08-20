from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from api.views import api, user

urlpatterns = [
    url(r'^$', api.APIRootView.as_view(), name='APIRootView'),
    url(r'^auth/login/$', obtain_jwt_token, name='login'),
    url(r'^user/$', user.UserView.as_view(), name='user'),
]
