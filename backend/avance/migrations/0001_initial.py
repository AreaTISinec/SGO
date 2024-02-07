# Generated by Django 5.0.1 on 2024-02-02 18:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('obras', '0003_obras_id_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvanceProyectado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('porcentaje', models.IntegerField()),
                ('id_obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='obras.obras')),
            ],
        ),
        migrations.CreateModel(
            name='AvanceReal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('porcentaje', models.IntegerField()),
                ('id_obra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='obras.obras')),
            ],
        ),
    ]
