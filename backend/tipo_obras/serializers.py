from rest_framework import serializers

from .models import TipoObra

class TipoObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoObra
        fields = '__all__'