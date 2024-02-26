

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
from .serializars import CustomTokenObtainPairSerializer, RegisterSerializer, LogoutSerializer

from rest_framework import status, generics, permissions
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
    


class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)
    def patch(self, request, *args, **kwargs):
        id_user = self.kwargs['id']
        objeto = UserAccount.objects.get(id=id_user)
        serializer = LogoutSerializer(objeto, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  