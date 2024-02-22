import os
from .settings import *
from .settings import BASE_DIR

SECRET_KEY = os.environ['SECRET']

ALLOWED_HOSTS = [
    os.environ['WEBSITE_HOSTNAME']
]

CSRF_TRUSTED_ORIGINS = ["https://" + os.environ['WEBSITE_HOSTNAME']]

DEBUG = False

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
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

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