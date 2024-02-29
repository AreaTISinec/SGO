from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Historial
from .serializers import HistorialSerializer

class HistorialListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    pagination_class = None
    serializer_class = HistorialSerializer
    queryset = Historial.objects.all()

class HistorialObraListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    pagination_class = None
    serializer_class = HistorialSerializer
    
    def get_queryset(self):
        id_obra = self.kwargs['id_obra']
        return Historial.objects.filter(id_obra=id_obra)
    
class HistorialUploadView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request):
        serializer = HistorialSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)       