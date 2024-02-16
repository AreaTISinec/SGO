from django.urls import path
from .views import UploadAvanceProyectado, UploadAvanceReal, AvanceProyectadoView, AvanceRealView, EliminarAvance

urlpatterns = [
    path('newProyec/', UploadAvanceProyectado.as_view()),
    path('newReal/', UploadAvanceReal.as_view()),
    path('real/', AvanceRealView.as_view()),
    path('proyectado/', AvanceProyectadoView.as_view()),
    path('delete/<int:pk>/', EliminarAvance.as_view()),
    
]