from rest_framework.views import APIView
from rest_framework import	permissions, status
from rest_framework.generics import ListAPIView, DestroyAPIView
from rest_framework.response import Response
from .serializers import AProyectadoSerializer, ARealSerializer
from .models import AvanceProyectado, AvanceReal

# Create your views here.
class UploadAvanceReal(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        serializer = ARealSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class UploadAvanceProyectado(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        serializer = AProyectadoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class AvanceProyectadoView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = AvanceProyectado.objects.all()
    serializer_class = AProyectadoSerializer
    pagination_class = None
    
class AvanceRealView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = AvanceReal.objects.all()
    serializer_class = ARealSerializer
    pagination_class = None
    
class EliminarAvance(DestroyAPIView):
    serializer_class = ARealSerializer
    def get_queryset(self):
        id_obra = self.kwargs["pk"]
        queryset = AvanceReal.objects.filter(id=id_obra) 
        return queryset