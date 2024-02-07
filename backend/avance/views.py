from rest_framework.views import APIView
from rest_framework import	permissions, status
from rest_framework.response import Response
from .serializers import AProyectadoSerializer, ARealSerializer

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