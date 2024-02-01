from django.urls import path
from .views import CeneListView, CeneItemByIDView, CeneItemByNameView, CeneUploadView, CeneSubirView

urlpatterns = [
    path('', CeneListView.as_view()),
    path('<pk>', CeneItemByIDView.as_view()),
    path('<str:nombre>', CeneItemByNameView.as_view()),
    path('search/', CeneListView.as_view()),
    path('new/', CeneUploadView.as_view()),
    path('new/', CeneSubirView.as_view()),
]