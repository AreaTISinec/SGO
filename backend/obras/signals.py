from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Max
from .models import  Obras
from avance.models import AvanceReal

@receiver(post_save, sender=AvanceReal)
def actualizar_porcentaje_avance(sender, instance, created, **kwargs):
    if created:
        id_obra = instance.id_obra_id
        ultimo_avance = AvanceReal.objects.filter(id_obra=id_obra).aggregate(Max('fecha'))
        if ultimo_avance['fecha__max']:
            ultimo_porcentaje = AvanceReal.objects.filter(id_obra=id_obra, fecha=ultimo_avance['fecha__max']).first().porcentaje
            Obras.objects.filter(id=id_obra).update(porc_avance=ultimo_porcentaje)
