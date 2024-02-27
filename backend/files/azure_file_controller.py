from io import BytesIO
import uuid
from pathlib import Path

from azure.storage.blob import BlobClient, BlobServiceClient

from django.conf import settings
from django.http import StreamingHttpResponse


from .models import File
from obras.models import Obras
import os, io


ALLOWED_EXTENTIONS = ['.pdf', '.doc', '.docx', '.xlsx']


def create_blob_client(file_name, tipo):
    
    c_string = 'DefaultEndpointsProtocol=https;AccountName=sgo01storage;AccountKey=gLztdn4MxjrMUQ/htxFlmVcuCLAVSq08ei0K/zRQFSxDmmPJRhbODnr9XC4fiPrLboobeB5xvuBE+AStsvcdTQ==;EndpointSuffix=core.windows.net'
    blob_service_client = BlobServiceClient.from_connection_string(c_string)
    container_name = tipo
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)
    return blob_client

def save_file_url_to_db(file_url, tipo, id_obra, blob_name):
    new_file = File.objects.create(file_url=file_url, tipo=tipo, id_obra=id_obra, blob_name=blob_name)
    new_file.save()
    return new_file
    
def upload_file_to_blob(file, tipo, id_obra):
    obra = Obras.objects.get(pk=id_obra)
    
    prefix = uuid.uuid4().hex
    ext = Path(file.name).suffix
    blob_name = f'{prefix}{ext}'
    file_io = BytesIO(file.read())
    blob_client = create_blob_client(blob_name, tipo)
    blob_client.upload_blob(data=file_io)
    file_object = save_file_url_to_db(blob_client.url, tipo, obra, blob_name)
    return file_object
    
def download_blob_to_file(  container_name, blob_name):
    c_string = 'DefaultEndpointsProtocol=https;AccountName=sgo01storage;AccountKey=gLztdn4MxjrMUQ/htxFlmVcuCLAVSq08ei0K/zRQFSxDmmPJRhbODnr9XC4fiPrLboobeB5xvuBE+AStsvcdTQ==;EndpointSuffix=core.windows.net'
    blob_service_client = BlobServiceClient.from_connection_string(c_string)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)
    
    download_dir = Path.home() / "Downloads"
    
    with open(file=os.path.join(download_dir, 'documento.pdf'), mode="wb") as sample_blob:
        download_stream = blob_client.download_blob()
        sample_blob.write(download_stream.readall())
        
        
def download_blob_to_stream( container_name, blob_name):
    c_string = 'DefaultEndpointsProtocol=https;AccountName=sgo01storage;AccountKey=gLztdn4MxjrMUQ/htxFlmVcuCLAVSq08ei0K/zRQFSxDmmPJRhbODnr9XC4fiPrLboobeB5xvuBE+AStsvcdTQ==;EndpointSuffix=core.windows.net'
    blob_service_client = BlobServiceClient.from_connection_string(c_string)
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

    stream = io.BytesIO()
    stream.write(blob_client.download_blob().readall())
    # Función generadora para transmitir el contenido del blob en trozos
    
    stream.seek(0)
    
    return stream
        

    # # Crear una respuesta HTTP de transmisión con el contenido del blob
    # response['Content-Disposition'] = f'attachment; filename="{blob_name}"'  # Establecer el nombre de archivo para la descarga
    # response = StreamingHttpResponse(stream_blob(), content_type='application/octet-stream')