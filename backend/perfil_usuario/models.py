from django.db import models
from django.conf import settings


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255, default='')
    apellido = models.CharField(max_length=255, default='')
    numero = models.CharField(max_length=45, default='')
    empresa = models.CharField(max_length=45, default='')
    
    def __str__(self):
        return f'{self.nombre} {self.apellido}'