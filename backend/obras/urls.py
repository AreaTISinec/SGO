from django.urls import path
from .views import ObraDetailView, ObraListView, ObraUploadView

urlpatterns = [
    path('', ObraListView.as_view()),
    path('<pk>', ObraDetailView.as_view()),
    path('nueva', ObraUploadView.as_view()),
]