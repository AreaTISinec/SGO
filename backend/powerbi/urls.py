from django.urls import path
from .views import get_access_token, getToken

urlpatterns = [
    path('getAccessToken/', getToken.as_view())
    # Otras URL de la aplicación...
]
