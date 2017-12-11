import logging

from django.contrib.auth import get_user_model
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny

from api.serializers import UserSerializer

logger = logging.getLogger(__name__)


class UserView(CreateModelMixin, RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    model_class = get_user_model()
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return self.model_class.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_object(self):
        if self.request.method != 'POST' and self.request.user.is_anonymous:
            raise NotAuthenticated()

        try:
            return get_object_or_404(self.model_class, pk=self.request.user.pk)
        except Http404 as e:
            logger.exception("Authenticated user model missing!?")
            raise e
