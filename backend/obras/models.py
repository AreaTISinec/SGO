from django.db import models
from accounts.models import UserAccount

# Create your models here.

class Obras(models.Model):
    id_user = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING)
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    fecha_asignacion = models.DateField()
    monto_neto = models.IntegerField()
    empresa = models.CharField(max_length=45)
    direccion = models.CharField(max_length=45)
    comuna = models.CharField(max_length=45)
    tipo_obra = models.CharField(max_length=45)
    estado_obra = models.CharField(max_length=45)
    observaciones = models.TextField()
    #calculado
    porc_avance = models.DecimalField(max_digits=5, decimal_places=1)
    monto_facturado = models.IntegerField()
    saldo_facturado = models.IntegerField(null = True)
    
    