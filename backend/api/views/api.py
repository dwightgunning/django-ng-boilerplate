from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class APIRootView(APIView):
    """
    Basic HATEOAS root
    """

    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        paths = {
            "auth": "/auth",
            "objects": "/objects",
            "user": "/user",
        }
        return Response(paths)
