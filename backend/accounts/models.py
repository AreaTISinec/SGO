from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, rol, password=None):
        if not email:
            raise ValueError('Se requiere de un email')
        email = self.normalize_email(email)
        user = self.model(email=email, username= username, rol=rol)
        
        user.set_password(password)
        user.save()
        
        return user
    def create_superuser(self, email, username, rol, password):
        user = self.create_user(email, username, rol, password)
        user.is_superuser = True
        user.save()
        
        return user
        

class UserAccount(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
      (1, 'superadmin'),
      (2, 'controlgestion'),
      (3, 'admin'),
      (4, 'supervisor'),
      (5, 'gerente'),
    )
    
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    rol = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)
    username = models.CharField(max_length=20, blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    
    objects = UserAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['rol', 'username']
    
    def get_full_name(self):
        return self.username
    
    def __str__(self):
        return self.email