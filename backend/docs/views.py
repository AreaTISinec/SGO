from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Docs
from .serializers import DocSerializer

class DocListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Docs.objects.all()
    serializer_class = DocSerializer
    pagination_class = None
    
        

class DocView(RetrieveAPIView):
    queryset = Docs.objects.all()
    serializer_class = DocSerializer
    