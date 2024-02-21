from rest_framework import permissions, status
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Empresa
from .serializers import EmpresaSerializer

class EmpresaListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = EmpresaSerializer
    pagination_class = None
    queryset = Empresa.objects.all()
    
class EmpresaView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, id_empresa):
        try:
            empresa = Empresa.objects.get(id=id_empresa)
        except Empresa.DoesNotExist:
            return Response({"error": "La empresa no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = EmpresaSerializer(empresa)
        
        return Response(serializer.data, status=status.HTTP_200_OK)