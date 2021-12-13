from django.db import models

# Create your models here.

class User(models.Model):
    documento = models.CharField(max_length=16, unique=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    class Meta:
        db_table = 'usuarios'
class Cuentas(models.Model):
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    tipo_usuario = models.IntegerField()
    institucion = models.CharField(max_length=255)
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
    autor = models.ForeignKey(Cuentas, on_delete=models.SET_NULL, null=True, blank=True)
    fecha_creacion = models.DateField()
    estado = models.IntegerField(default=2)
    archivo = models.ForeignKey(Archivos, on_delete=models.SET_NULL, null=True, blank=True)
    class Meta:
        db_table = 'proyectos'
class Evaluacion (models.Model):
    descripcion = models.CharField(max_length=255, null=True, blank=True)
    fecha_reporte = models.DateField()
    archivo = models.ForeignKey(Archivos,on_delete=models.SET_NULL, null=True, blank=True)
    valor_evaluacion = models.IntegerField(null=True, blank=True)
    class Meta:
        db_table = 'evaluacion'
class Evaluadores_Asignados(models.Model):
    usuario = models.ForeignKey(Cuentas, on_delete=models.SET_DEFAULT, default=1)
    proyecto = models.ForeignKey(Proyectos, on_delete=models.SET_NULL, null=True, blank=True)
    evaluacion = models.ForeignKey(Evaluacion, on_delete=models.DO_NOTHING, null=True, blank=True)
    class Meta:
        db_table = 'evaluadores_asignados'