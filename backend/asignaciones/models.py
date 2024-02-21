from django.db import models
from perfil_usuario.models import UserProfile
from obras.models import Obras


# Create your models here.
class Asignaciones(models.Model):
    
    id_user = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING)
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)