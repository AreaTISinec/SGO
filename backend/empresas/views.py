from rest_framework import permissions
from rest_framework.generics import ListAPIView

from .models import Empresa
from .serializers import EmpresaSerializer

class EmpresaListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = EmpresaSerializer
    pagination_class = None
    queryset = Empresa.objects.all()