from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Cene
from .serializers import CeneSerializer

class CeneListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Cene.objects.all()
    serializer_class = CeneSerializer

class CeneItemView(RetrieveAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CeneSerializer
    
    def get_queryset(self):
        param = self.kwargs['param']
        
        queryset1 = Cene.objects.filter(id_cene=param)
        queryset2 = Cene.objects.filter(nombre = param)
        
        return queryset1