from django.db import models

# Create your models here.
class Empresa(models.Model):
    # EMPRESA_CHOICES = (
    #     (1, 'Sinec'),
    #     (2, 'Sinelec'),
    #     (3, 'Urbelec'),
    # )
    
    nombre = models.CharField(max_length=245)
    
    def __str__(self) :
        return self.nombre