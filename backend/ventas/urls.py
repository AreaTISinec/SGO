from django.urls import path
from .views import import_from_excel

urlpatterns = [
    path('upload/', import_from_excel, name='import_from_excel'),
    
]