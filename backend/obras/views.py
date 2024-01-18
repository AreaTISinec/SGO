from rest_framework.generics import  ListAPIView, RetrieveAPIView
from rest_framework import permissions
from rest_framework.views import APIView
from .models import Obras
from .serializers import ObraSerializer

class ObraListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Obras.objects.all()
    serializer_class = ObraSerializer
    pagination_class = None
    

class ObraDetailView(RetrieveAPIView):
    queryset = Obras.objects.all()
    serializer_class = ObraSerializer
    
class ObraUploadView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        data = self.request.data
        
        
        
    