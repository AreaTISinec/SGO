from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import Max
from .models import  Obras
from avance.models import AvanceReal
from files.models import File

@receiver(post_save, sender=AvanceReal)
def actualizar_porcentaje_avance(sender, instance, created, **kwargs):
    if created:
        id_obra = instance.id_obra_id
        ultimo_avance = AvanceReal.objects.filter(id_obra=id_obra).aggregate(Max('fecha'))
        if ultimo_avance['fecha__max']:
            ultimo_porcentaje = AvanceReal.objects.filter(id_obra=id_obra, fecha=ultimo_avance['fecha__max']).first().porcentaje
            Obras.objects.filter(id=id_obra).update(porc_avance=ultimo_porcentaje)

@receiver(post_delete, sender=AvanceReal)
def eliminar_actualizar_porcentaje_avance(sender, instance, **kwargs):
    id_obra = instance.id_obra_id
    print('antes del if')
    avances = AvanceReal.objects.filter(id_obra=id_obra).order_by('-fecha')

    if avances.exists():
        print('dentro del if')
        ultimo_avance = avances.first()
        Obras.objects.filter(id=id_obra).update(porc_avance=ultimo_avance.porcentaje)
    else:
        # No hay avances, por lo que porcentaje de avance en Obras podría ser
        # actualizado a un valor por defecto o a None según la lógica de tu aplicación
        print('else signal')
        Obras.objects.filter(id=id_obra).update(porc_avance=0)
        

@receiver(post_save, sender=File)
def actualizar_req_files(sender, instance, created, **kwargs):
    if created:
        obra = instance.id_obra
        if instance.tipo == 'gantt':
            obra.gantt = True
        elif instance.tipo == 'presupuesto':
            obra.presupuesto = True
        elif instance.tipo == 'cubicacion':
            pass 
        ##AÑADIR CAMPO CUBICACION OBLIGATORIO
        obra.save()