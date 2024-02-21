# Generated by Django 5.0.1 on 2024-02-21 12:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [

    ]

    operations = [
        migrations.CreateModel(
            name='Asignaciones',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='obras.obras')),
                ('id_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='perfil_usuario.userprofile')),
            ],
        ),
    ]
