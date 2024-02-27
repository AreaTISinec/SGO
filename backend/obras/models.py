from django.db import models
from cene.models import Cene
from perfil_usuario.models import UserProfile

# Create your models here.

class Obras(models.Model):
    empresa = models.CharField(max_length=45)
    cliente = models.CharField(max_length=255)
    responsable = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, related_name='responsable_obra')
    nombre = models.CharField(max_length=255)
    presupuesto = models.IntegerField()
    
    #calculado
    monto_facturado = models.IntegerField(null=True)#monto facturado
    monto_por_facturar = models.IntegerField(null=True)#monto x facturar
    
    porc_avance_financiero = models.IntegerField()
    porc_avance_operativo = models.IntegerField()
    estado_obra = models.CharField(max_length=45)

    
    fecha_inicio = models.DateField()
    fecha_termino = models.DateField()
    fecha_asignacion = models.DateField()
    
    supervisor = models.ForeignKey(UserProfile, on_delete=models.DO_NOTHING, null=True, related_name='supervisor_obra')
    cene = models.ForeignKey(Cene, on_delete=models.DO_NOTHING, default=0)
    
    direccion = models.CharField(max_length=45)
    comuna = models.CharField(max_length=45)
    tipo_obra = models.CharField(max_length=45)
    observaciones = models.TextField(null=True)

    is_gantt = models.BooleanField(default=False)
    is_presupuesto = models.BooleanField(default=False)
    is_avance = models.BooleanField(default=False)
    
    
    class Meta:
        ordering = ('empresa', 
                    'cliente', 
                    'responsable', 
                    'nombre', 
                    'presupuesto', 
                    'monto_facturado', 
                    'monto_por_facturar', 
                    'porc_avance_financiero', 
                    'porc_avance_operativo', 
                    'estado_obra', 
                    'fecha_inicio', 
                    'fecha_asignacion', 
                    'supervisor', 
                    'cene',
                    'direccion',
                    'comuna',
                    'tipo_obra',
                    'observaciones',
                    'is_gantt',
                    'is_presupuesto',
                    'is_avance')
    
    def calcular_monto_facturado():
        
        pass
    
    def calcular_saldo_facturado():
        
        pass
    
    