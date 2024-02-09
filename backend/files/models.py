from django.db import models

class File(models.Model):
    
    date_created = models.DateTimeField(auto_now_add=True)
    file_url = models.URLField(null=True)
    file_name = models.CharField(max_length=245, null=True)
    file_extension = models.CharField(max_length=245, null=True)
    is_deleted = models.BooleanField(null=True, default=False)
