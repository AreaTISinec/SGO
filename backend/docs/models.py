from django.db import models
from obras.models import Obras

class Docs(models.Model):
    nombre = models.CharField(max_length=45)
    tipo = models.CharField(max_length=45)
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)
    doc = models.FileField(upload_to='documentos/')
    
    def __str__(self):
        return self.nombre