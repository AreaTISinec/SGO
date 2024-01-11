from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from django.contrib.auth import authenticate, login
from .decorators import Unauthenticated_user
from django.utils.decorators import method_decorator

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    @method_decorator(Unauthenticated_user)
    def post(self, request, format=None):
        data = self.request.data
        
        email = data['email']
        password = data['password']
        
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            
            return Response({'success': 'Inicio de sesion exitosa'})
        else:
            return Response({'error': 'Credenciales invalidas'}, status=status.HTTP_401_UNAUTHORIZED)

class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    @method_decorator(Unauthenticated_user)
    def post(self, request, format=None):
        data = self.request.data
        
        username = data['username']
        email = data['email']
        password = data['password']
        re_password = data['re_password']
        rol = data['rol']
        
        if password == re_password:
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email ya existe'})
            else:
                if len(password) < 6:
                    return Response({'error': 'Contraseña demasiado corta'})
                else:
                    user = User.objects.create_user(email=email, password=password, rol=rol, username=username)
                    
                    user.save()
                    return Response({'succes': 'Usuario creado correctamente'})
                    
        else:
            return Response({'error': 'Contraseñas no coinciden'})
        