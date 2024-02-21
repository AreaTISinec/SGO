from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext as _


from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import UserAccount

class LogoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'rol', 'email', 'is_connected']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'rol', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 6}
        }
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        token['rol'] = user.rol
        token['is_active'] = user.is_active
        token['is_connected'] = user.is_connected
        token['is_staff'] = user.is_staff
        
        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required= True,
        validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True,
        required= True,
    )
    class Meta:
        model = UserAccount
        fields = ['email', 'username', 'rol', 'password', 'password2']
        
    def validate(self, attrs):
        if attrs['password'] != attrs ['password2']:
            raise serializers.ValidationError(
                {"password": "Contraseñas no coinciden"}
            )
        
        return attrs
    
    def create(self, validated_data):
        user = UserAccount.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            rol = validated_data['rol']
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user
    # def create(self, validated_data):
    #     return get_user_model().objects.create_user(**validated_data)
    
    # def update(self, instance, validated_data):
    #     password = validated_data.pop('password', None)
    #     user = super().update(instance, validated_data)
        
    #     if password:
    #         user.set_password(password)
    #         user.save()
            
    #     return user
    
# class AuthTokenSerializer(serializers.Serializer):
#     email = serializers.EmailField(max_length=255)
#     password = serializers.CharField(max_length=255, trim_whitespace=False)
    
#     def validate(self, attrs):
#         print(attrs)
#         email = attrs.get('email')
#         password = attrs.get('password')
#         user = authenticate(
#             request=self.context.get('request'),
#             username=email,
#             password=password
#         )
#         print(user)
#         if not user:
#             msg = _('no es posible autenticar con las credenciales proporsionadas')
#             raise serializers.ValidationError(msg, code='authorization')
        
#         attrs['user'] = user
        
#         return attrs