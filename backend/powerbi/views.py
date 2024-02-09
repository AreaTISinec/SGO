import adal
from django.conf import settings
from django.http import JsonResponse

def get_access_token(request):
    authority_url = 'https://login.microsoftonline.com/' + settings.AZURE_AD_CREDENTIALS['TENANT_ID']
    resource_url = 'https://analysis.windows.net/powerbi/api'  # URL del recurso Power BI

    context = adal.AuthenticationContext(authority_url)
    token_response = context.acquire_token_with_client_credentials(
        resource_url,
        settings.AZURE_AD_CREDENTIALS['CLIENT_ID'],
        settings.AZURE_AD_CREDENTIALS['CLIENT_SECRET']
    )

    if 'accessToken' in token_response:
        access_token = token_response['accessToken']
        return JsonResponse({'accessToken': access_token})
    else:
        return JsonResponse({'error': 'No se pudo obtener el token de acceso'}, status=500)
