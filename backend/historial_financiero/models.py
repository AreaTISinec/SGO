from django.db import models
from perfil_usuario.models import UserProfile
from obras.models import Obras

# Create your models here.
class Historial(models.Model):
    
    fecha = models.DateField()
    monto = models.IntegerField()
    responsable = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING)
    porcentaje = models.IntegerField(default=0)
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)