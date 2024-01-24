from rest_framework import serializers
from .models import Cene

class CeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cene
        fields = '__all__'