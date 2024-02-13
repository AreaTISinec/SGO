from django.urls import path

from .views import TipoObraListView

urlpatterns = [
    path('', TipoObraListView.as_view())
]
