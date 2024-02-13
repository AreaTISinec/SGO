from django.db import models

# Create your models here.

class TipoObra(models.Model):
    # TIPO_OBRA_CHOICES = (
    #     (1, 'Alumbrado Publico'),
    #     (2, 'Construccion en Media y Baja Tension'),
    #     (3, 'Celdas y Empalme'),
    # )

    nombre = models.CharField(max_length=245)
    
    def __str__(self):
        return self.nombre