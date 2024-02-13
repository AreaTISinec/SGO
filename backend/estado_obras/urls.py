from django.urls import path

from .views import EstadoListView

urlpatterns = [
    path('', EstadoListView.as_view()),
]
