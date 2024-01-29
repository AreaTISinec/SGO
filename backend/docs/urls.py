from django.urls import path
from .views import DocView, DocListView, UploadDocumentView

urlpatterns = [
    path('', DocListView.as_view()),
    path('<pk>', DocView.as_view()),
    path('upload/', UploadDocumentView.as_view()),
    
]