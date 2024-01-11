from django.contrib import admin
from .models import Docs

class DocAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'tipo', 'id_obra')
    list_display_links = ('id', 'nombre')
    search_fields = ('nombre',)
    list_per_page = 10
    
admin.site.register(Docs, DocAdmin)