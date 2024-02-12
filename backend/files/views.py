from .models import File
from pathlib import Path
from django.contrib import messages
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse


from .azure_file_controller import ALLOWED_EXTENTIONS, upload_file_to_blob

from django.views import View
from django.shortcuts import render, HttpResponse, Http404
from django.contrib import messages
from . import models
import mimetypes

class uploadFileView(APIView):
    
    def post(self, request, *args, **kwargs):
        file = request.FILES['doc']
        tipo = request.data['tipo']
        print(tipo)
        id_obra = request.data['id_obra']
        file_name = file.name
        ext = Path(file_name).suffix
        file_object = upload_file_to_blob(file, tipo, id_obra)
        file_object.file_name = file_name
        file_object.file_extention = ext
        return Response(status=status.HTTP_201_CREATED) 




class ListFilesView(View):
    def get(self, request):
        files = models.File.objects.filter(deleted=0)
        context = {"files": files}
        return context

class DownloadFileView(View):
    def get(self, request, file_id):
        file = models.File.objects.get(pk=file_id)
        file_name = file.file_name
        file_type, _ = mimetypes.guess_type(file_name)
        url = file.file_url
        blob_name = url.split("/")[-1]
        blob_content = download_blob(blob_name)
        if blob_content:
            response = HttpResponse(blob_content.readall(), content_type=file_type)
            response['Content-Disposition'] = f'attachment; filename={file_name}'
            messages.success(request, f"{file_name} was successfully downloaded")
            return response
        raise Http404
