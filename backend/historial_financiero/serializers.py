from rest_framework.serializers import Serializer
from .models import Historial


class HistorialSerializer(Serializer):
    class Meta:
        model = Historial
        fields = ['fecha', 'monto', 'responsable','id_obra']
        

   
