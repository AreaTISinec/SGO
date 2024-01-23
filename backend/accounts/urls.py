from django.urls import path
from .views import SignupView, LoginView, GetCSRFToken, LogoutView, CheckAuthenticatedView, DeleteAccountView

urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('registrar', SignupView.as_view()),
    path('login', LoginView.as_view()),
    path('csrfcookie', GetCSRFToken.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
]