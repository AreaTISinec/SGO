from django.urls import path
from .views import UserProfileView, UserProfileUpdateView, UsersByEmpresaView

urlpatterns = [
    #cargar profile
    path('', UserProfileView.as_view()),
    #perfil de usuario por id
    path('<int:id_user>/', UserProfileView.as_view()),
    #lista perfiles segun empresa
    path('lista/<int:id_empresa>/', UsersByEmpresaView.as_view()),
    #actualizar profile
    path("update/<int:id_user>/", UserProfileUpdateView.as_view()),
]