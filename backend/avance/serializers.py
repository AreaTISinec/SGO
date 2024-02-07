from rest_framework import serializers
from .models import AvanceProyectado, AvanceReal

class AProyectadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvanceProyectado
        fields = '__all__'
        
class ARealSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvanceReal
        fields = '__all__'