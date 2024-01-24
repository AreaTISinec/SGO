from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext as _
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'rol', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 6}
        }
    
    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        
        if password:
            user.set_password(password)
            user.save()
            
        return user
    
class AuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255, trim_whitespace=False)
    
    def validate(self, attrs):
        print(attrs)
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        print(user)
        if not user:
            msg = _('no es posible autenticar con las credenciales proporsionadas')
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        
        return attrs