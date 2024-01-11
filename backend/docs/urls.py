from django.urls import path
from .views import DocView, DocListView

urlpatterns = [
    path('', DocListView.as_view()),
    path('<pk>', DocView.as_view()),
    
]