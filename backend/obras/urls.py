from django.urls import path
from .views import ObraListSearch, ObraDetailView, ObraListView, ObraUploadView, ObrasUsuarioAPIView

urlpatterns = [
    path('', ObraListView.as_view()),
    path('<pk>/', ObraDetailView.as_view()),
    path('nueva/', ObraUploadView.as_view()),
    path('search/', ObraListSearch.as_view()),
    path('user/<int:id_user>/', ObrasUsuarioAPIView.as_view())
]