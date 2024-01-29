from django.urls import path
# from .views import SignupView, LoginView, GetCSRFToken, LogoutView, CheckAuthenticatedView, DeleteAccountView, CustomObtainAuthTokenView
from .views import CustomObtainAuthTokenView, AccountCreateView, AccountRetrieveUpdateView

urlpatterns = [
    # path('authenticated', CheckAuthenticatedView.as_view()),
     path('token/', CustomObtainAuthTokenView.as_view(), name='token'),
     path('me/', AccountRetrieveUpdateView.as_view(), name='me'),
     path('registrar/', AccountCreateView.as_view(), name='registrar'),
    # path('registrar', SignupView.as_view()),
    # path('login', LoginView.as_view()),
    # path('csrfcookie', GetCSRFToken.as_view()),
    # path('logout', LogoutView.as_view()),
    # path('delete', DeleteAccountView.as_view()),
]