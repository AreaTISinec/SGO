from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions, status
from .models import Docs
from .serializers import DocSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class DocListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Docs.objects.all()
    serializer_class = DocSerializer
    pagination_class = None
    
class DocListUserView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = DocSerializer
    pagination_class = None
    def get_queryset(self):
        id_obra = self.kwargs['id_obra']
        return Docs.objects.filter(id_obra=id_obra)
        

class DocView(RetrieveAPIView):
    queryset = Docs.objects.all()
    serializer_class = DocSerializer

class UploadDocumentView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, *args, **kwargs):
        serializer = DocSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)