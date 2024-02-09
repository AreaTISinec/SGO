from .models import File
from pathlib import Path
from django.contrib import messages
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


from .azure_file_controller import ALLOWED_EXTENTIONS, upload_file_to_blob

class uploadFileView(APIView):
    
    def post(self, request, *args, **kwargs):
        file = request.FILES['doc']
        tipo = request.data['tipo']
        id_obra = request.data['id_obra']
        file_name = file.name
        ext = Path(file_name).suffix
        file_object = upload_file_to_blob(file, tipo, id_obra)
        file_object.file_name = file_name
        file_object.file_extention = ext
        return Response(status=status.HTTP_201_CREATED) 
        
        
       