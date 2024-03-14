import adal
from django.conf import settings
from django.http import JsonResponse
import logging
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response

import msal


app = msal.ConfidentialClientApplication(
    settings.AZURE_AD_CREDENTIALS['CLIENT_ID'],
    authority=settings.AZURE_AD_CREDENTIALS['AUTHORITY'] + settings.AZURE_AD_CREDENTIALS['TENANT_ID'],
    client_credential= settings.AZURE_AD_CREDENTIALS['CLIENT_SECRET']
)

def get_access_token(request):
    result = None
    
    result = app.acquire_token_silent(settings.AZURE_AD_CREDENTIALS['SCOPES'], account=None)

    if not result:
        logging.info("No suitable token exists in cache. Let's get a new one from AAD.")
        result = app.acquire_token_for_client(scopes=settings.AZURE_AD_CREDENTIALS['SCOPES'])

    if "access_token" in result:
        print(result['access_token'])
    else:
        print(result.get("error"))
        print(result.get("error_description"))
        print(result.get("correlation_id"))  # You may need this when reporting a bug
        
        
class getToken(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        result = None
    
        result = app.acquire_token_silent(settings.AZURE_AD_CREDENTIALS['SCOPES'], account=None)
        print(result)

        if not result:
            logging.info("No suitable token exists in cache. Let's get a new one from AAD.")
            result = app.acquire_token_for_client(scopes=settings.AZURE_AD_CREDENTIALS['SCOPES'])

        if "access_token" in result:
            print(result['access_token'])
            return Response(status=status.HTTP_200_OK)
        else:
            print(result.get("error"))
            print(result.get("error_description"))
            print(result.get("correlation_id"))  # You may need this when reporting a bug
            return Response(status=status.HTTP_400_BAD_REQUEST)
        