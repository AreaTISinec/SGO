from .models import File
from pathlib import Path
from django.contrib import messages
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import HttpResponse, StreamingHttpResponse


from .azure_file_controller import ALLOWED_EXTENTIONS, upload_file_to_blob, download_blob_to_stream

from django.views import View
from django.shortcuts import render, HttpResponse, Http404
from django.contrib import messages
from . import models
import mimetypes
from .serializers import FileSerializer

class uploadFileView(APIView):
    
    def post(self, request, *args, **kwargs):
        file = request.FILES['doc']
        tipo = request.data['tipo']
        id_obra = request.data['id_obra']
        file_name = file.name
        ext = Path(file_name).suffix
        file_object = upload_file_to_blob(file, tipo, id_obra)
        file_object.file_name = file_name
        file_object.file_extension = ext
        file_object.save()
        print(file_object)
        return Response(status=status.HTTP_201_CREATED) 




class ListFilesView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = FileSerializer
    pagination_class = None
    def get_queryset(self):
        obra_id = self.kwargs["obra_id"]
        queryset = File.objects.filter(is_deleted=0, id_obra=obra_id)
        return queryset
    
        
class DownloadFileView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = FileSerializer
    
    def get(self, request, file_id):
        file = File.objects.get(pk=file_id)
        file_name = file.blob_name
        container = file.tipo
        stream = download_blob_to_stream(container, file_name)
        response = StreamingHttpResponse(stream, content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'
        
        return response