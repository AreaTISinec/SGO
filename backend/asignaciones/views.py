from rest_framework import permissions
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

from .models import Asignaciones


class AsignacionView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, *args, **kwargs):
        print(request)
        id_obra = request.data["id_obra"]
        id_user = request.data["id_user"]
        new_asig = Asignaciones.objects.create(id_user=id_user, id_obra=id_obra)
        new_asig.save()
        return new_asig
    
class AsignacionesListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    pagination_class = None
    
    def get_queryset(self):
        user_id = self.kwargs['id_user']
        return Asignaciones.objects.filter(id_user=user_id)
    
        