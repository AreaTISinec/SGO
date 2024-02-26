import os
from .settings import *
from .settings import BASE_DIR

print(f"Loaded settings: {os.environ['DJANGO_SETTINGS_MODULE']}")

SECRET_KEY = os.environ['SECRET']

ALLOWED_HOSTS = [
    os.environ['WEBSITE_HOSTNAME']
]

CSRF_TRUSTED_ORIGINS = ["https://" + os.environ['WEBSITE_HOSTNAME']]

DEBUG = True

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'dist/assets')
]

STATIC_ROOT = os.path.join(BASE_DIR, 'assets')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'sgo1',
        'USER': 'SGOsinec',
        'PASSWORD': 'Sinec2k24',
        'HOST': 'sgo.mysql.database.azure.com',
        'PORT': '3306',
        'OPTIONS': {
            'ssl':{
                'ca_path': '../certs/DigiCertGlobalRootCA.crt.pem'
            }
        }
    }
}