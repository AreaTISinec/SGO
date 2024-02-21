from django.urls import path

from .views import EmpresaListView, EmpresaView

urlpatterns = [
    path('', EmpresaListView.as_view()),
    path('<int:id_empresa>/', EmpresaView.as_view())
]
