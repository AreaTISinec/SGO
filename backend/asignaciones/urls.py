from django.urls import path
from .views import AsignacionView, AsignacionesListView

urlpatterns = [
    path('<int:id_user>/', AsignacionesListView.as_view()),
    path('new/', AsignacionView.as_view()),
]


