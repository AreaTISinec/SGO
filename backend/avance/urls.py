from django.urls import path
from .views import UploadAvanceProyectado, UploadAvanceReal, AvanceProyectadoView, AvanceRealView

urlpatterns = [
    path('newProyec/', UploadAvanceProyectado.as_view()),
    path('newReal/', UploadAvanceReal.as_view()),
    path('real/', AvanceRealView.as_view()),
    path('proyectado/', AvanceProyectadoView.as_view()),
]