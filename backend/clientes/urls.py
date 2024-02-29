from django.urls import path

from .views import ClienteListView, ClienteView

urlpatterns = [
    path('', ClienteListView.as_view()),
    path('<str:rut>/', ClienteView.as_view())
]
