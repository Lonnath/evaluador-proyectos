from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from api.models import *
import datetime
import json
@csrf_exempt
def registrar_usuario(request):
    try:
        jd = json.loads(request.body)
        if jd:
            documento = jd['documento'] if 'documento' in jd else None
            nombre = jd['nombre'] if 'nombre' in jd else None
            email = jd['email'] if 'email' in jd else None
            contrasenia = jd['password'] if 'password' in jd else None
            tipo_usuario = jd['tipo'] if 'tipo' in jd else None
            usuario = User(documento=documento, nombre=nombre)
            usuario.save()
            cuenta = Cuentas(email=email.lower(), password=contrasenia, tipo_usuario=tipo_usuario.lower(), user=usuario)
            cuenta.save()
        return JsonResponse({'CODE':1, 'MESSAGE':'Se ha registrado exitosamente en el portal, será redireccionado a la pagina principal en un momento.', 'DATA': 'Ok'})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Cuenta existente, intentelo nuevamente con un email o documento diferente.', 'DATA': 'ERROR'})
@csrf_exempt
def login(request):
    jd = json.loads(request.body)
    if jd:
        email = jd['email'] if 'email' in jd else None
        password = jd['password'] if 'password' in jd else None
        acceso = Cuentas.objects.filter(email=email.lower(), password=password).values('email', 'tipo_usuario', 'user_id')
        out = json.dumps(acceso[0])
        if out :
            return JsonResponse({'CODE':1, 'MESSAGE':'Acceso Permitido', 'DATA': out})
        else:
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado, Verifique los datos de acceso.', 'DATA': 'ERROR'})
@csrf_exempt
def postular_proyecto(request):
    try:
        jd = json.loads(request.body)
        if jd:
            title = jd['title'] if 'title' in jd else None
            keysword = jd['keysword'] if 'keysword' in jd else None
            resumen = jd['resumen'] if 'resumen' in jd else None
            topic = jd['topic'] if 'topic' in jd else None
            autor = jd['autor'] if 'autor' in jd else None
            now = jd['now'] if 'now' in jd else None
            autor_user = User.objects.get(id=autor)
            proyecto = Proyectos(titulo=title, palabras_clave = keysword, resumen = resumen, topico = topic, autor=autor_user, fecha_creacion = now)
            proyecto.save()
        return JsonResponse({'CODE':1, 'MESSAGE':'Postulación de proyecto realizada con exito.', 'DATA': jd})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo postular el proyecto, verifique la información suministrada.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_proyectos_admin(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            usuario = Cuentas.objects.filter(email=user)
            if usuario:
                proyectos = Proyectos.objects.filter(estado=2)
                out = []
                for x in proyectos:
                    out.append({'id_proyecto':x.id, 'titulo':x.titulo, 'autor':x.autor.nombre, 'fecha_creacion': x.fecha_creacion.strftime('%d/%m/%Y'), 'estado':'Pendiente'})
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "Falla."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_proyectos_autor(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            usuario = Cuentas.objects.filter(id=user)
            if usuario:
                proyectos = Proyectos.objects.all()
                out = []
                for x in proyectos:
                    if x.autor.id==user:
                        out.append({'titulo':x.titulo, 'autor':x.autor.nombre, 'fecha_creacion': x.fecha_creacion.strftime('%d/%m/%Y'), 'estado':'Pendiente'})
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "Falla."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def modificar_proyectos_autor(request):
    try:
        jd = json.loads(request.body)
        if jd:
            autor = jd['autor'] if 'autor' in jd else None
            id_proyecto = jd['id_proyecto'] if 'id_proyecto' in jd else None
            usuario = Cuentas.objects.filter(id=autor)
            if usuario:
                proyecto = Proyectos.objects.get(id=id_proyecto, user = autor)
                return JsonResponse({'CODE':1, 'MESSAGE':'Actualización Realizada con Exito.', 'DATA': "Ok." })
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "Falla."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})