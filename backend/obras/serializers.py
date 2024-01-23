from rest_framework import serializers
from .models import Obras

class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obras
        fields = '__all__'