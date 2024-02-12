from django.urls import path
from .views import uploadFileView, ListFilesView, DownloadFileView

urlpatterns = [
    path('upload/', uploadFileView.as_view()),
    path('list/', ListFilesView.as_view(), name='list_files'),
    path('download/<int:file_id>/', DownloadFileView.as_view(), name='download_file'),
]