from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .serializers import EstadoObraSeriaizer
from .models import EstadoObra

class EstadoListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = EstadoObraSeriaizer
    pagination_class = None
    queryset = EstadoObra.objects.all()
    