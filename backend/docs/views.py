from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions, status
from .models import Docs
from obras.models import Obras
from .serializers import DocSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class DocListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Docs.objects.all()
    serializer_class = DocSerializer
    pagination_class = None
    
        

class DocView(RetrieveAPIView):
    queryset = Docs.objects.all()
    serializer_class = DocSerializer

class UploadDocumentView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, *args, **kwargs):
        nombre = request.data.get('nombre')
        archivo = request.data.get('doc')
        if nombre and archivo:
            ##arreglar esto
            id_obra = Obras.objects.get(id=1)
            document = Docs(nombre=nombre, doc=archivo, id_obra=id_obra)
            document.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)