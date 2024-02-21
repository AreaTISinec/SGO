from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from accounts.views import CustomTokenObtainPairView

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts/', include('accounts.urls')),
    path('api/ventas/', include('ventas.urls')),
    path('api/obras/', include('obras.urls')),
    path('api/cene/', include('cene.urls')),
    path('api/avance/', include('avance.urls')),
    path('api/files/', include('files.urls')),
    path('api/powerbi/', include('powerbi.urls')),
    path('api/estados-obra/', include('estado_obras.urls')),
    path('api/tipos-obra/', include('tipo_obras.urls')),
    path('api/empresas/', include('empresas.urls')),
    path('admin/', admin.site.urls),
    path('api/asignacion/', include('asignaciones.urls')),
    path('api/profile/', include('perfil_usuario.urls'))
] 
static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
