from rest_framework.generics import  ListAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Obras
from .serializers import ObraSerializer

class ObraListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Obras.objects.all()
    serializer_class = ObraSerializer
    pagination_class = None
    

class ObraDetailView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Obras.objects.all()
    serializer_class = ObraSerializer
    
class ObraListByIDView(ListAPIView):
    
    permission_classes = (permissions.AllowAny, )
    serializer_class = ObraSerializer
    
    def get_queryset(self):
        try:
            search_term = self.request.query_params.get('search', None)
            # Obtenemos el valor del tipo de obra desde la URL
            id_user = self.kwargs['id_user']
            
            # Filtramos las obras que tienen el mismo valor en el campo 'tipo_obra'
            queryset = Obras.objects.filter(id_user=id_user)
            return queryset
        except:
            return Response({'error': 'Algo ocurrio mal al intentar checkear el estado de autentificacion'})
        
    
class ObraUploadView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        data = self.request.data
        
class ObraListSearch(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = ObraSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Obras.objects.all()
        search_term = self.request.query_params.get('search', None)

        if search_term:
            queryset = queryset.filter(id_user=search_term)
        
        return queryset
        
    