from rest_framework.test import APIRequestFactory, APITestCase

from api.views.api import APIRootView


class APITests(APITestCase):
    def test_api_root(self):
        factory = APIRequestFactory()
        request = factory.get("/")

        view = APIRootView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data, {"auth": "/auth", "objects": "/objects", "user": "/user"}
        )
