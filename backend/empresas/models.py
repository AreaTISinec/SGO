from django.db import models

# Create your models here.
class Empresa(models.Model):

    
    nombre = models.CharField(max_length=245)
    
    def __str__(self) :
        return self.nombre