from io import BytesIO
import uuid
from pathlib import Path

from azure.storage.blob import BlobClient, BlobServiceClient

from django.conf import settings

from .models import File
from obras.models import Obras


ALLOWED_EXTENTIONS = ['.pdf', '.doc', '.docx', '.xlsx']


def create_blob_client(file_name):
    
    c_string = 'DefaultEndpointsProtocol=https;AccountName=doccontenedor;AccountKey=VTtHPcpKr4jXLVCmw+OMhv5xgm6hxLETNvNlbtoWD4VndrIeCvf52PwZipwnmprGWJN6KOkGsT/L+AStIYQ0oQ==;EndpointSuffix=core.windows.net'
    blob_service_client = BlobServiceClient.from_connection_string(c_string)
    container_name = 'documentos'
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)
    return blob_client

def save_file_url_to_db(file_url, tipo, id_obra):
    new_file = File.objects.create(file_url=file_url, tipo=tipo, id_obra=id_obra)
    new_file.save()
    return new_file
    
def upload_file_to_blob(file, tipo, id_obra):
    obra = Obras.objects.get(pk=id_obra)
    
    prefix = uuid.uuid4().hex
    ext = Path(file.name).suffix
    blob_name = f'{prefix}{ext}'
    file_io = BytesIO(file.read())
    blob_client = create_blob_client(blob_name)
    blob_client.upload_blob(data=file_io)
    file_object = save_file_url_to_db(blob_client.url, tipo, obra)
    return file_object
    
def download_blob(file):
    blob_client = create_blob_client(file)
    if not blob_client.exists():
        return
    blob_content = blob_client.download_blob()
    return blob_content