from django.test import TestCase
from django.urls import reverse

class TestUrls(TestCase):

    def test_authenticated_session(self):
        url = reverse('authenticated_session', args=[])
        self.assertEqual(url, '/api/authenticated-session/')
