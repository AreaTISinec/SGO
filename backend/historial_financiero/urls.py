from django.urls import path
from .views import HistorialListView, HistorialObraListView, HistorialUploadView

urlpatterns = [
    path('', HistorialListView.as_view()),
    path('<int:id_obra>/', HistorialObraListView.as_view()),
    path('upload/', HistorialUploadView.as_view()),
]