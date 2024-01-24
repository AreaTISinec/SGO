from django.urls import path
from .views import CeneListView

urlpatterns = [
    path('', CeneListView.as_view()),
]