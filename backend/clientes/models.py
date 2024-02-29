from django.db import models

# Create your models here.
class Cliente(models.Model):
    rut = models.CharField(max_length=9, primary_key=True)
    nombre = models.CharField(max_length=245)
    
    def __str__(self):
        return self.nombre