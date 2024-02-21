from django.urls import path
from .views import UserProfileView

urlpatterns = [
    path('', UserProfileView.as_view()),
    path('<int:id_user>/', UserProfileView.as_view())
]