from django.db import models

# Create your models here.
class EstadoObra(models.Model):
    # ESTADO_OBRA_CHOICES = (
    #     (1, 'Adjudicada'),
    #     (2, 'En Ejecucion'),
    #     (3, 'Paralizada'),
    #     (4, 'Ejecutada'),
    #     (5, 'Entregada'),
    # )
    estado = models.CharField(max_length=245)
    
    def __str__(self):
        return self.estado