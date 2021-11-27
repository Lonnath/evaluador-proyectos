from django.db import models
from django.db.models.deletion import RESTRICT

# Create your models here.

class User(models.Model):
    documento = models.CharField(max_length=16, unique=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        db_table = 'usuarios'
class Cuentas(models.Model):
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    tipo_usuario = models.CharField(max_length=20)
    class Meta:
        db_table = 'cuentas'
class Archivos(models.Model):
    ruta = models.TextField()
    nombre_archivo=models.CharField(max_length=255)
    extension = models.CharField(max_length=5)
    class Meta:
        db_table = 'archivos'
class Proyectos(models.Model):
    titulo = models.CharField(max_length=255, unique=True)
    palabras_clave = models.CharField(max_length=255)
    resumen = models.TextField()
    topico = models.CharField(max_length=255)
    autor = models.ForeignKey(User, on_delete=RESTRICT)
    fecha_creacion = models.DateField()
    estado = models.IntegerField(default=2)
    class Meta:
        db_table = 'proyectos'