from django.db import models
from accounts.models import UserAccount
from cene.models import Cene

# Create your models here.

class Obras(models.Model):
    id_user = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING)
    id_cene = models.ForeignKey(Cene, on_delete=models.DO_NOTHING, default=0)
    
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    fecha_asignacion = models.DateField()
    monto_neto = models.IntegerField()
    empresa = models.CharField(max_length=45)
    direccion = models.CharField(max_length=45)
    comuna = models.CharField(max_length=45)
    tipo_obra = models.CharField(max_length=45)
    estado_obra = models.CharField(max_length=45)
    observaciones = models.TextField(null=True)
    
    gantt = models.BooleanField(default=False)
    presupuesto = models.BooleanField(default=False)
    
    #calculado
    porc_avance = models.IntegerField()
    monto_facturado = models.IntegerField(null=True)
    saldo_facturado = models.IntegerField(null=True)
    
    def calcular_monto_facturado():
        
        pass
    
    def calcular_saldo_facturado():
        
        pass
    
    