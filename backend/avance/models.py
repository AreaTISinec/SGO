from django.db import models
from obras.models import Obras

# Create your models here.

class AvanceReal(models.Model):
    fecha = models.DateField()
    porcentaje = models.IntegerField()
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)
    
class AvanceProyectado(models.Model):
    fecha = models.DateField()
    porcentaje = models.IntegerField()
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)
    