

from rest_framework.response import Response
from rest_framework.views import APIView
# from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authtoken.views import ObtainAuthToken

# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
# from django.contrib import auth
from django.conf import settings
# from django.contrib.auth import authenticate
# from django.contrib.auth.models import update_last_login

from .models import UserAccount
from .serializars import CustomTokenObtainPairSerializer, RegisterSerializer

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class RegisterView(generics.CreateAPIView):
    queryset = UserAccount.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    if request.method == "GET":
        response = f"{request.user}, Estas viendo una respuesta GET"
        return Response({'response': response}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        text = request.POST.get("text")
        response = f"{request.user}, tu texto es {text}"
        return Response({'response': response}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
    






# class AccountCreateView(CreateAPIView):
#     serializer_class = UserSerializer
    

# class AccountRetrieveUpdateView(RetrieveUpdateAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserSerializer
    
#     def get_object(self):
#         return self.request.user
    
    
# class CustomObtainAuthTokenView(ObtainAuthToken):
#     serializer_classes = AuthTokenSerializer
    
#     def  post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data, context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = authenticate(**serializer.validated_data)
#         response = super().post(request, *args, **kwargs)
        
#         if user and response.status_code == 200:
#             update_last_login(None, user)
        
#             token = response.data.get(settings.AUTH_COOKIE)
#             print(token)
#             if token:
#                 response.set_cookie(
#                     settings.AUTH_COOKIE,
#                     token,
#                     max_age=settings.AUTH_COOKIE_MAX_AGE,
#                     path=settings.AUTH_COOKIE_PATH,
#                     secure=settings.AUTH_COOKIE_SECURE,
#                     httponly=settings.AUTH_COOKIE_HTTP_ONLY,
#                     samesite=settings.AUTH_COOKIE_SAMESITE
#                 )
#         return response
    
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie(settings.AUTH_COOKIE)
        
        return response
    
# @method_decorator(csrf_protect, name='dispatch')
# class CheckAuthenticatedView(APIView):
#     def get(self, request, format=None):
#         try:
#             IsAuthenticated = User.is_authenticated
            
#             if IsAuthenticated:
#                 return Response({'isAuthenticated': 'success'})
#             else:
#                 return Response({'isAuthenticated': 'error'})
#         except:
#             return Response({'error': 'Algo ocurrio mal al intentar checkear el estado de autentificacion'})
    
    
# @method_decorator(csrf_protect, name='dispatch')
# class LoginView(APIView):
#     permission_classes = (permissions.AllowAny,)
    
#     #@method_decorator(Unauthenticated_user)
#     def post(self, request, format=None):
#         data = self.request.data
        
#         email = data['email']
#         password = data['password']
        
#         try:
#             user = authenticate(request, email=email, password=password)
            
#             if user is not None:
#                 auth.login(request, user)
#                 return Response({'success': 'Inicio de sesion exitosa'})
#             else:
#                 return Response({'error': 'Credenciales invalidas'}, status=status.HTTP_401_UNAUTHORIZED)            
#         except:
#             return Response({'error': 'Algo malo ocurrio al intentar iniciar sesion'})


# @method_decorator(csrf_protect, name='dispatch')
# class SignupView(APIView):
#     permission_classes = (permissions.AllowAny,)
    
#     #@method_decorator(Unauthenticated_user)
#     def post(self, request, format=None):
#         data = self.request.data
        
#         username = data['username']
#         email = data['email']
#         password = data['password']
#         re_password = data['re_password']
#         rol = data['rol']
        
#         try:
#             if password == re_password:
#                 if User.objects.filter(email=email).exists():
#                     return Response({'error': 'Email ya existe'})
#                 else:
#                     if len(password) < 6:
#                         return Response({'error': 'Contraseña debe tener al menos 6 caracteres'})
#                     else:
#                         user = User.objects.create_user(email=email, password=password, rol=rol, username=username)                
#                         user.save()
                        
#                         user = User.objects.get(id=user.id)
                        
#                         user_profile = UserProfile(user=user, nombre='', apellido='', numero='', empresa='')
#                         user_profile.save()
                        
#                         return Response({'succes': 'Usuario creado correctamente'})
#             else:
#                 return Response({'error': 'Contraseñas no coinciden'})
#         except:
#             return Response({'error': 'Algo ocurrio mal al intentar registrar la cuenta'})
                    


# class LogoutView(APIView):
#     def post(self, request, format=None):
#         try:
#             auth.logout(request)
#             return Response({ 'success': 'Loggout Out' })
#         except:
#             return Response({ 'error': 'Something went wrong when logging out' })

# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class GetCSRFToken(APIView):
#     permission_classes = (permissions.AllowAny, )
    
#     def get(self, request, format=None):
#         return Response({'success': 'CSRF cookie set'})
    
# class DeleteAccountView(APIView):
#     def delete(self, request, format=None):
#         user = self.request.user
        
#         try:
#             user = User.objects.filter(id=user.id.delete())
#         except: 
#             return ({'error': 'Algo ocurrio mal al intentar borrar usuario'})
        
