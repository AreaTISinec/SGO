from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Cene
from .serializers import CeneSerializer

class CeneListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CeneSerializer
    pagination_class = None
    
    def get_queryset(self):
        queryset = Cene.objects.all()
        search_term = self.request.query_params.get('search', None)

        if search_term:
            queryset = queryset.filter(nombre__icontains=search_term)
        
        return queryset

class CeneItemByIDView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CeneSerializer
    
    def get_queryset(self):
        id_cene = self.kwargs['id_cene']
    
        queryset = Cene.objects.filter(id_cene=id_cene) 
        
        return queryset
    
class CeneItemByNameView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = CeneSerializer
    
    def get_queryset(self):
        nombre = self.kwargs['nombre']
    
        queryset = Cene.objects.filter(nombre=nombre) 
        
        return queryset