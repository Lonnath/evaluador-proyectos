# Generated by Django 3.2.3 on 2021-11-28 08:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Evaluadores_Asignados',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor_evaluacion', models.IntegerField()),
                ('proyecto_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.proyectos')),
                ('usuario_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.cuentas')),
            ],
            options={
                'db_table': 'evaluadores_asignados',
            },
        ),
    ]
