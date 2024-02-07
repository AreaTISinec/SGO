from django.urls import path
from .views import get_access_token

urlpatterns = [
    path('getAccessToken/', get_access_token, name='get_access_token'),
    # Otras URL de la aplicación...
]
