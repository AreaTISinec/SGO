from rest_framework.generics import ListAPIView
from rest_framework import permissions

from .models import TipoObra
from .serializers import TipoObraSerializer

class TipoObraListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = TipoObraSerializer
    pagination_class = None
    queryset = TipoObra.objects.all()