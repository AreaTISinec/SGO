from django.urls import path
from .views import CeneListView, CeneItemByIDView, CeneItemByNameView

urlpatterns = [
    path('', CeneListView.as_view()),
    path('<int:id_cene>', CeneItemByIDView.as_view()),
    path('<str:nombre>', CeneItemByNameView.as_view()),
]