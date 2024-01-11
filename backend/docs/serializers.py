from rest_framework import serializers
from .models import Docs

class DocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docs
        fields = '__all__'