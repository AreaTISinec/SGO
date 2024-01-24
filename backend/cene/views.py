from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .models import Cene
from .serializers import CeneSerializer

class CeneListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Cene.objects.all()
    serializer_class = CeneSerializer
    