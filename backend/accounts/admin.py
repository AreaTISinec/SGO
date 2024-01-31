from django.contrib import admin
from .models import UserAccount
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'rol']
    
admin.site.register(UserAccount, UserAdmin)
