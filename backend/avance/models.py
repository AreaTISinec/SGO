from django.db import models
from obras.models import Obras

# Create your models here.

class Avances(models.Model):
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)
    fecha = models.DateField()
    porcentaje = models.IntegerField()
    tipo = models.CharField(max_length=255, null=False)