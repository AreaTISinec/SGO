from rest_framework.authentication import TokenAuthentication
from django.conf import settings

class CustomTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get(settings.AUTH_COOKIE)
        
        if not token:
            return None
        
        return self.authenticate_credentials(token)