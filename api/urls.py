from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token

from api.views import api, user

urlpatterns = [
    path('', api.APIRootView.as_view(), name='APIRootView'),
    path('auth/login/', obtain_jwt_token, name='login'),
    path('user/', user.UserView.as_view(), name='user'),
]
