from django.db import models

class Cene(models.Model):
    id_cene = models.IntegerField(primary_key=True)
    nombre = models.CharField(max_length=255)