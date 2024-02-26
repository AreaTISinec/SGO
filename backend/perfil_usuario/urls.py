from django.urls import path
from .views import UserProfileView, UserProfileUpdateView

urlpatterns = [
    path('', UserProfileView.as_view()),
    path('<int:id_user>/', UserProfileView.as_view()),
    path("update/<int:id_user>/", UserProfileUpdateView.as_view()),
]
