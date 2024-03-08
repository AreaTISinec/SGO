from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.db.models import Max
from .models import  Obras
from avance.models import Avances
from files.models import File
from historial_financiero.models import Historial

######################### AVANCES #####################################

@receiver(post_save, sender=Avances)
def actualizar_porcentaje_avance(sender, instance, created, **kwargs):
    if created:
        id_obra = instance.id_obra_id
        ultimo_avance_operacional = Avances.objects.filter(id_obra=id_obra, tipo='real').aggregate(Max('fecha'))
        if ultimo_avance_operacional['fecha__max']:
            fecha_maxima = ultimo_avance_operacional['fecha__max']
            ultimo_porcentaje = Avances.objects.filter(id_obra=id_obra, fecha=fecha_maxima).last().porcentaje
            Obras.objects.filter(id=id_obra).update(porc_avance_operativo=ultimo_porcentaje)

@receiver(post_delete, sender=Avances)
def eliminar_actualizar_porcentaje_avance(sender, instance, **kwargs):
    id_obra = instance.id_obra_id
    print('antes del if')
    avances = Avances.objects.filter(id_obra=id_obra).order_by('-fecha')

    if avances.exists():
        ultimo_avance = avances.first()
        Obras.objects.filter(id=id_obra).update(porc_avance_operativo=ultimo_avance.porcentaje)
    else:
        # No hay avances, por lo que porcentaje de avance en Obras podría ser
        # actualizado a un valor por defecto o a None según la lógica de tu aplicación
        print('else signal')
        Obras.objects.filter(id=id_obra).update(porc_avance_operativo=0)
        
@receiver(post_save, sender=Avances)
def actualizar_is_avance(sender, instance, created, **kwargs):
    if created:  # Solo se activa cuando se crea un nuevo objeto Avance
        # Obtener la obra asociada a este avance
        obra = instance.id_obra
        
        # Verificar si todos los hitos para esta obra tienen un porcentaje de 100%
        if Avances.objects.filter(id_obra=obra, porcentaje=100).count() == 1:
            # Actualizar el campo is_avance en la obra a True
            obra.is_avance = True
            obra.save()
        
######################### ARCHIVOS #####################################

@receiver(post_save, sender=File)
def actualizar_req_files(sender, instance, created, **kwargs):
    if created:
        obra = instance.id_obra
        if instance.tipo == 'gantt':
            obra.is_gantt = True
        elif instance.tipo == 'presupuesto':
            obra.is_presupuesto = True
        elif instance.tipo == 'cubicacion':
            ##AÑADIR CAMPO CUBICACION OBLIGATORIO
            pass 
        obra.save()
        
######################### OBRAS #####################################

#X probar aun
@receiver(post_save, sender=Obras)
def actualizar_monto_por_facturar(sender, instance, **kwargs):
    print("dentro señal 1")
    monto_por_facturar = instance.presupuesto - instance.monto_facturado
    print(monto_por_facturar)
    Obras.objects.filter(pk=instance.pk).update(monto_por_facturar=monto_por_facturar)
    
    
@receiver(post_save, sender=Historial)
def actualizar_facturacion(sender, instance, created, **kwargs):
    print("dentro señal 2")
    if created:
        id_obra = instance.id_obra_id
        obra = Obras.objects.get(pk=id_obra)
        obra.monto_facturado = obra.monto_facturado + instance.monto
        print(obra.porc_avance_financiero)
        obra.porc_avance_financiero = (obra.monto_facturado / obra.presupuesto) * 100
        print(obra.porc_avance_financiero)
        obra.save()
        