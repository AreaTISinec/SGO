from django.urls import path
from .views import uploadFileView

urlpatterns = [
    path('upload/', uploadFileView.as_view()),
]