from django.urls import path
from .views import DocView, DocListView, UploadDocumentView, DocListUserView

urlpatterns = [
    path('', DocListView.as_view()),
    path('<pk>', DocView.as_view()),
    path('upload/', UploadDocumentView.as_view()),
    path('obra/<int:id_obra>/', DocListUserView.as_view()),
]