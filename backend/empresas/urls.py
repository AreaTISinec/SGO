from django.urls import path

from .views import EmpresaListView

urlpatterns = [
    path('', EmpresaListView.as_view()),
]
