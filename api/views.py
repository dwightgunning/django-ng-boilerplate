from rest_framework.views import APIView
from rest_framework.response import Response


class APIRootView(APIView):
    """
    Basic HATEOAS root
    """

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        paths = {
            'objects': '/objects'
        }
        return Response(paths)
