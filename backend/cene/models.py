from django.db import models
from django.core.validators import RegexValidator

class Cene(models.Model):
    alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')
    
    id_cene = models.CharField(max_length=15, primary_key=True, validators=[RegexValidator(regex =r'^[0-9a-zA-Z]*$', message= 'Only alphanumeric characters are allowed.')])
    nombre = models.CharField(max_length=255)
    empresa = models.CharField(max_length=255, null=False, default='')