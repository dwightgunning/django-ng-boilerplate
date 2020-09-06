from django.contrib.auth import get_user_model
from rest_framework.test import (APIRequestFactory, APITestCase,
                                 force_authenticate)

from api.views.user import UserView

User = get_user_model()


class UserTests(APITestCase):
    fixtures = ["users.json"]

    test_username = "tester"
    test_password = "testpassword"

    def setUp(self):
        user = User.objects.get(username=self.test_username)
        user.set_password(self.test_password)
        user.save()

    def add_auth(self, request, username):
        user = User.objects.get(username=username)
        force_authenticate(request, user=user)

    def test_user_authenticated(self):
        factory = APIRequestFactory()
        request = factory.get("/user/")
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            "username": "tester",
            "email": "tester@tester.com"
            })

    def test_user_anonymous(self):
        factory = APIRequestFactory()
        request = factory.get("/user/")

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 401)

    def test_patch_password(self):
        factory = APIRequestFactory()
        request = factory.patch("/user/", {
            "password": "testpassword",
            "password_new": "adf2r2@#$ASdf234"
            })
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 200, response.data)

    def test_patch_password_invalid_password(self):
        factory = APIRequestFactory()
        request = factory.patch("/user/", {"password": "invalid_password"})
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)

    def test_patch_password_missing_new_password(self):
        factory = APIRequestFactory()
        request = factory.patch("/user/", {"password": "adf2r2@#$ASdf234"})
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)
        self.assertEqual(
            response.data["non_field_errors"][0].code, "invalid")
        self.assertEqual(
          str(response.data["non_field_errors"][0]),
          "Password must be updated via 'password_new' field."
        )

    def test_patch_password_blank_new_password(self):
        factory = APIRequestFactory()
        request = factory.patch("/user/", {
            "password": "adf2r2@#$ASdf234",
            "password_new": ""
            })
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)

    def test_patch_password_invalid_new_password(self):
        factory = APIRequestFactory()
        request = factory.patch("/user/", {
            "password": "adf2r2@#$ASdf234",
            "password_new": "simple"
            })
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)

    def test_patch_password_matching_new_password(self):
        factory = APIRequestFactory()
        request = factory.patch("/user/", {
            "password": self.test_password,
            "password_new": "adf2r2@#$ASdf234"
            })
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 200, response.data)

    def test_put_update(self):
        new_username = "newusername"
        factory = APIRequestFactory()
        request = factory.put("/user/", {
            "username": new_username,
            "email": "tester@tester.com"
            })
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 200, response.data)
        self.assertEqual(response.data["username"], new_username)

    def test_put_password(self):
        factory = APIRequestFactory()
        request = factory.put("/user/", {"password": "adf2r2@#$ASdf234"})
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)

    def test_delete_user(self):
        factory = APIRequestFactory()
        request = factory.delete("/user/")
        self.add_auth(request, self.test_username)

        view = UserView.as_view()
        response = view(request)
        response.render()
        request.user.refresh_from_db()

        self.assertEqual(response.status_code, 204, response.data)
        self.assertFalse(request.user.is_active)

    def test_create_user(self):
        factory = APIRequestFactory()
        request = factory.post("/user/", {
            "username": "tester2",
            "email": "tester2@tester.com",
            "password": "adf2r2@#$ASdf234"
            })

        view = UserView.as_view()
        response = view(request)
        response.render()
        self.assertEqual(response.status_code, 201, response.data)

    def test_create_user_existing_username(self):
        factory = APIRequestFactory()
        request = factory.post("/user/", {
            "username": "tester",
            "email": "new_email@tester.com",
            "password": "adf2r2@#$ASdf234"
            })

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)
        self.assertTrue("username" in response.data.keys())

    def test_create_user_existing_email(self):
        factory = APIRequestFactory()
        request = factory.post("/user/", {
            "username": "new_tester",
            "email": "tester@tester.com",
            "password": "adf2r2@#$ASdf234"
            })

        view = UserView.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, 400, response.data)
        self.assertTrue("email" in response.data.keys())
