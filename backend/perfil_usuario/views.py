from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.generics import UpdateAPIView
from rest_framework.views import APIView
from .serializers import UserProfileSerializer
from .models import UserProfile
from accounts.models import UserAccount

class UserProfileView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, id_user):
        try:
            user = UserProfile.objects.get(id=id_user)
        except UserProfile.DoesNotExist:
            return Response({"error": "El usuario no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserProfileSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProfileUpdateView(UpdateAPIView):
    permission_classes = (permissions.AllowAny, )
    
    def patch(self, request, *args, **kwargs):
        id_user = self.kwargs['id_user']
        usuario = UserProfile.objects.get(id=id_user)
        serializer = UserProfileSerializer(usuario, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
