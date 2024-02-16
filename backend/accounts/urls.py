from django.urls import path
from .views import LogoutView, RegisterView, dashboard


urlpatterns = [
    path('registrar/', RegisterView.as_view(), name='registrar'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/<int:id>/', LogoutView.as_view(), name='logout'),
]