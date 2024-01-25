from django.urls import path
from .views import ObraListSearch, ObraDetailView, ObraListView, ObraUploadView, ObraListByIDView

urlpatterns = [
    path('', ObraListView.as_view()),
    path('<id_user>', ObraListByIDView.as_view()),
    path('nueva', ObraUploadView.as_view()),
    path('search/', ObraListSearch.as_view()),
]