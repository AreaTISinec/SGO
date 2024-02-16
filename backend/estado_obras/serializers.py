from rest_framework import serializers
from .models import EstadoObra

class EstadoObraSeriaizer(serializers.ModelSerializer):
    class Meta:
        model = EstadoObra
        fields = '__all__'