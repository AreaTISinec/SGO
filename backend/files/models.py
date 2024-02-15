from django.db import models
from obras.models import Obras

class File(models.Model):
    
    date_created = models.DateTimeField(auto_now_add=True)
    file_url = models.URLField(null=True)
    file_name = models.CharField(max_length=245, null=True)
    blob_name = models.CharField(max_length=2450, default= '')
    tipo = models.CharField(max_length=245, null=True)
    file_extension = models.CharField(max_length=245, null=True)
    is_deleted = models.BooleanField(null=True, default=False)
    id_obra = models.ForeignKey(Obras, on_delete=models.CASCADE)
