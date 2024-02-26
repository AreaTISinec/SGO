from rest_framework import serializers
from .models import Avances

class AvancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avances
        fields = '__all__'
        