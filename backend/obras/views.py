from rest_framework.generics import  ListAPIView, RetrieveAPIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Obras
from .serializers import ObraSerializer
from rest_framework.response import Response 

class ObraListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Obras.objects.all()
    serializer_class = ObraSerializer
    pagination_class = None
    

class ObraDetailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Obras.objects.all()
    serializer_class = ObraSerializer
    
class ObrasUsuarioAPIView(ListAPIView):
    serializer_class = ObraSerializer
    pagination_class = None

    def get_queryset(self):
        usuario_id = self.kwargs['id_user']  # Obtener el ID del usuario desde la URL
        return Obras.objects.filter(responsable=usuario_id)
        

        
class ObraListSearch(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = ObraSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Obras.objects.all()
        search_term = self.request.query_params.get('search', None)

        if search_term:
            queryset = queryset.filter(responsable=search_term)
        
        return queryset
        
class ObraUploadView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        serializer = ObraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)