from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from api.models import *
import datetime
import json
@csrf_exempt
def registrar_usuarios(request):
    try:
        jd = json.loads(request.body)
        if jd:
            documento = jd['documento'] if 'documento' in jd else None
            nombre = jd['nombre'] if 'nombre' in jd else None
            email = jd['email'] if 'email' in jd else None
            contrasenia = jd['password'] if 'password' in jd else None
            tipo_usuario = jd['tipo'] if 'tipo' in jd else None
            institucion = jd['institucion'] if 'institucion' in jd else None
            if not documento or not nombre or not email or not contrasenia or not tipo_usuario or not institucion :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            
            usuario = User(documento=documento, nombre=nombre)
            cuenta = Cuentas(email=email.lower(), password=contrasenia, tipo_usuario=tipo_usuario, user=usuario, institucion=institucion)
            usuario.save()
            cuenta.save()
            return JsonResponse({'CODE':1, 'MESSAGE':'Se ha registrado exitosamente en el portal, será redireccionado a la pagina principal en un momento.', 'DATA': 'Ok'})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Cuenta existente, intentelo nuevamente con un email o documento diferente.', 'DATA': 'ERROR'})
@csrf_exempt
def login(request):
    jd = json.loads(request.body)
    if jd:
        email = jd['email'] if 'email' in jd else None
        password = jd['password'] if 'password' in jd else None
        if not email or not password :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
        acceso = Cuentas.objects.filter(email=email.lower(), password=password).values('id', 'email', 'tipo_usuario', 'user_id')
        out = json.dumps(acceso[0])
        if out :
            return JsonResponse({'CODE':1, 'MESSAGE':'Acceso Permitido', 'DATA': out})
        else:
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado, Verifique los datos de acceso.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_proyectos(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})     
            usuario = Cuentas.objects.get(id=user)
            if usuario:
                proyectos = Proyectos.objects.all()
                out = []
                for x in proyectos:
                    estado = ""
                    if x.estado == 1:
                        estado = "EVALUADO"
                    elif x.estado == 2:
                        estado = "PENDIENTE"
                    elif x.estado == 3:
                        estado = "EN EVALUACION"
                    else:
                        estado = "DESCONOCIDO"
                    if usuario.tipo_usuario == 1:
                        out.append({'id_proyecto':x.id, 'titulo':x.titulo, 'autor':x.autor.user.nombre, 'fecha_creacion': x.fecha_creacion.strftime('%d/%m/%Y'), 'estado': estado, 'keysword': x.palabras_clave, 'resumen' : x.resumen, 'topico': x.topico, 'num_estado' : x.estado})
                    else:
                        if x.autor.id==user:
                            out.append({'id_proyecto':x.id, 'titulo':x.titulo, 'autor':x.autor.user.nombre, 'fecha_creacion': x.fecha_creacion.strftime('%d/%m/%Y'), 'estado': estado, 'keysword': x.palabras_clave, 'resumen' : x.resumen, 'topico': x.topico, 'num_estado' : x.estado})
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_proyectos_evaluar(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user or user is None :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})     
            usuario = Cuentas.objects.get(id=user)
            if usuario and usuario.tipo_usuario == 1 or usuario.tipo_usuario ==3:
                proyectos = Proyectos.objects.all()
                evaluadores = Evaluadores_Asignados.objects.all()
                out = []
                for x in proyectos:
                    estado = ""
                    if x.estado == 1:
                        estado = "EVALUADO"
                    elif x.estado == 2:
                        estado = "PENDIENTE"
                    elif x.estado == 3:
                        estado = "EN EVALUACION"
                    else:
                        estado = "DESCONOCIDO"
                    if usuario.tipo_usuario == 1:
                        out.append({'id_proyecto':x.id, 'titulo':x.titulo, 'autor':x.autor.user.nombre, 'fecha_creacion': x.fecha_creacion.strftime('%d/%m/%Y'), 'estado': estado, 'keysword': x.palabras_clave, 'resumen' : x.resumen, 'topico': x.topico, 'num_estado' : x.estado})
                    else:
                        for y in evaluadores :
                            if y.usuario.id == user and x.id == evaluadores.proyecto.id:
                                out.append({'id_proyecto':x.id, 'titulo':x.titulo, 'autor':x.autor.user.nombre, 'fecha_creacion': x.fecha_creacion.strftime('%d/%m/%Y'), 'estado': estado, 'keysword': x.palabras_clave, 'resumen' : x.resumen, 'topico': x.topico, 'num_estado' : x.estado})        
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta Autorizada.', 'DATA': out})
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})
        else:
            return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
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
            if not title or not keysword or not resumen or not topic or not autor or not now :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            
            autor_user = Cuentas.objects.get(id=autor)
            proyecto = Proyectos(titulo=title, palabras_clave = keysword, resumen = resumen, topico = topic, autor=autor_user, fecha_creacion = now)
            proyecto.save()
        return JsonResponse({'CODE':1, 'MESSAGE':'Postulación de proyecto realizada con exito.', 'DATA': jd})
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo postular el proyecto, verifique la información suministrada.', 'DATA': 'ERROR'})
@csrf_exempt
def eliminar_proyectos(request):
    try:
        jd = json.loads(request.body)
        if jd:
            id_user = jd['id_user'] if 'id_user' in jd else None
            id_proyecto = jd['id_proyecto'] if 'id_proyecto' in jd else None
            if not id_user or not id_proyecto :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Cuentas.objects.get(id=id_user)
            if usuario:
                proyecto = Proyectos.objects.get(id=id_proyecto)
                if usuario.tipo_usuario > 1:
                    if proyecto.autor == usuario:
                        proyecto.delete()
                    else:
                        return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})
                else:
                    proyecto.delete()
                return JsonResponse({'CODE':1, 'MESSAGE':'Eliminación Realizada con Exito.', 'DATA': "Ok." })
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def modificar_proyectos(request):
    try:
        jd = json.loads(request.body)
        if jd:
            id_proyecto = jd['id_proyecto'] if 'id_proyecto' in jd else None
            title = jd['title'] if 'title' in jd else None
            keysword = jd['keysword'] if 'keysword' in jd else None
            resumen = jd['resumen'] if 'resumen' in jd else None
            topic = jd['topic'] if 'topic' in jd else None
            autor = jd['autor'] if 'autor' in jd else None
            if not id_proyecto or not title or not keysword or not resumen or not topic or not autor:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Cuentas.objects.get(id=autor)
            if usuario:
                proyecto = Proyectos.objects.get(id=id_proyecto)
                proyecto.titulo = title
                proyecto.palabras_clave = keysword
                proyecto.resumen = resumen
                proyecto.topico = topic
                proyecto.resumen = resumen
                if usuario.tipo_usuario == 1 or proyecto.autor_id == usuario.id:
                    try: 
                        proyecto.save()
                        return JsonResponse({'CODE':1, 'MESSAGE':'Modificaciones realizadas con exito.', 'DATA': "Ok."})
                    except Exception as e:
                        return JsonResponse({'CODE':2, 'MESSAGE':'Modificaciones no realizadas, posibles causas: Titulo existente, Archivo duplicado.', 'DATA': "Ok."})    
            return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})

@csrf_exempt
def asignar_evaluador(request):
    try:
        jd = json.loads(request.body)
        if jd:
            id_admin = jd['id_admin'] if 'id_admin' in jd else None
            proyecto = jd['proyecto'] if 'proyecto' in jd else None
            observaciones = jd['observaciones'] if 'observaciones' in jd else None
            evaluacion = int(jd['evaluacion']) if 'evaluacion' in jd else None
            evaluador = int(jd['evaluador']) if 'evaluador' in jd else None
            if not evaluador and not evaluacion:
                return JsonResponse({'CODE':2, 'MESSAGE':'Debe evaluar o asignar evaluador, campos no seleccionados.', 'DATA': "ERROR."})
            if not id_admin or not proyecto:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            admin = Cuentas.objects.get(id=id_admin)
            if admin.tipo_usuario != 1:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})    
            
            evaluacion_consulta = Evaluacion(descripcion = observaciones, fecha_reporte = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), valor_evaluacion = evaluacion)
            proyecto_consulta = Proyectos.objects.get(id=proyecto)
            
            if evaluacion > 0:
                proyecto_consulta.estado = 1
            else:
                proyecto_consulta.estado = 3
            if proyecto_consulta :
                asignar_evaluador = Evaluadores_Asignados(proyecto=proyecto_consulta, evaluacion = evaluacion_consulta)
                accion ="Evaluación realizada con exito."
                if evaluador > 0 :
                    accion ="Asignación realizada con exito."
                    evaluador = Cuentas.objects.get(id=evaluador)
                    if evaluador.tipo_usuario != 3:
                        return JsonResponse({'CODE':2, 'MESSAGE':'Usuario no es evaluador.', 'DATA': "ERROR."})    
                    asignar_evaluador.usuario = evaluador
                else:
                    asignar_evaluador.usuario = admin
                try:
                    proyecto_consulta.save()
                    evaluacion_consulta.save()
                    asignar_evaluador.save()
                    return JsonResponse({'CODE':1, 'MESSAGE': accion, 'DATA': "Ok."})
                except Exception as e:
                    return JsonResponse({'CODE':2, 'MESSAGE':'No se pudo realizar la evaluación, verifique la información suministrada.', 'DATA': "ERROR."})    
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'Proyecto no existe.', 'DATA': "ERROR."})
            
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})

@csrf_exempt
def consultar_evaluadores(request):
    try:
        jd = json.loads(request.body)
        if jd:
            id_admin = jd['id_admin'] if 'id_admin' in jd else None
            if not id_admin :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            admin = Cuentas.objects.get(id=id_admin)
            if admin.tipo_usuario != 1:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})
            evaluadores = Cuentas.objects.all().filter(tipo_usuario = 3)
            out = []
            for x in evaluadores:
                out.append({'id':x.id, 'documento': x.user.documento, 'nombre': x.user.nombre})
            if len(out) > 0:
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta realizada con exito.', 'DATA': out})    
            else:
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta realizada con exito.', 'DATA': out})    
    except Exception as e:
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})

@csrf_exempt
def consultar_evaluaciones(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            proyecto_id = jd['proyecto_id'] if 'proyecto_id' in jd else None
            if not user or not proyecto_id :
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            admin = Cuentas.objects.get(id=user)
            if admin.tipo_usuario != 1:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})
            evaluaciones = Evaluadores_Asignados.objects.all().filter(proyecto_id=proyecto_id)
            out = []
            for x in evaluaciones:
                descripcion = ""
                evaluacion = ""
                archivo = ""
                if x.evaluacion.descripcion:
                    descripcion = x.evaluacion.descripcion
                else:
                    descripcion = "Sin observación"
                if int(x.evaluacion.valor_evaluacion) > 0:
                    if int(x.evaluacion.valor_evaluacion) == 1:
                        evaluacion = "ACEPTADO"
                    elif int(x.evaluacion.valor_evaluacion) == 2:
                        evaluacion = "RECHAZADO"
                    elif int(x.evaluacion.valor_evaluacion) == 3:
                        evaluacion = "DEVUELTO"
                else:
                    evaluacion = "No ha sido evaluado."
                
                if x.evaluacion.archivo:
                    archivo = x.evaluacion.archivo.id
                else:
                    archivo = "Sin archivo."
                out.append({'evaluador': str(x.usuario.user.documento+"~"+x.usuario.user.nombre), 'fecha_reporte': x.evaluacion.fecha_reporte.strftime("%Y-%m-%d %H:%M:%S"), 'observacion': descripcion, 'evaluacion': evaluacion, 'archivo' : archivo})
            
            if len(out) > 0:
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta realizada con exito.', 'DATA': out})    
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'No se encontraron registros.', 'DATA': "ERROR."})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
@csrf_exempt
def consultar_evaluaciones_evaluador(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            if not user:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            usuario = Cuentas.objects.get(id=user)
            if usuario.tipo_usuario != 3:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})
            evaluaciones = Evaluadores_Asignados.objects.all().filter(usuario=usuario)
            out = []
            for x in evaluaciones:
                if x.evaluacion.valor_evaluacion == 0:
                    archivo = "No tiene archivo."
                    if x.proyecto.archivo:
                        archivo = x.proyecto.archivo.id
                        
                    estado = "DESCONOCIDO"
                    if x.proyecto.estado == 1:
                        estado = "EVALUADO"
                    elif x.proyecto.estado == 2:
                        estado = "PENDIENTE"
                    elif x.proyecto.estado == 3:
                        estado = "EN EVALUACION"
                    out.append({'id_evaluacion': x.id, 'autor': str(x.proyecto.autor.user.documento+"~"+x.proyecto.autor.user.nombre) , 'titulo': x.proyecto.titulo, 'fecha_creacion': x.evaluacion.fecha_reporte.strftime("%Y-%m-%d %H:%M:%S"), 'archivo': archivo, 'estado': estado, 'keysword': x.proyecto.palabras_clave, 'resumen':x.proyecto.resumen, 'topico':x.proyecto.topico})
            
            if len(out) > 0:
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta realizada con exito.', 'DATA': out})    
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'No se encontraron registros.', 'DATA': "ERROR."})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})
"""@csrf_exempt
def evaluar_proyecto_evaluador(request):
    try:
        jd = json.loads(request.body)
        if jd:
            user = jd['user'] if 'user' in jd else None
            proyecto = jd['proyecto'] if 'proyecto' in jd else None
            observaciones = jd['observaciones'] if 'observaciones' in jd else None
            evaluacion = int(jd['evaluacion']) if 'evaluacion' in jd else None
            if not user or not proyecto or not observaciones or not evaluacion:
                return JsonResponse({'CODE':2, 'MESSAGE':'Faltan datos.', 'DATA': "ERROR."})
            evaluador = Cuentas.objects.get(id = user)

            if evaluador != 3:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acceso Denegado.', 'DATA': "ERROR."})
            proyecto = Proyectos.objects.get(id=proyecto)
            if not proyecto:
                return JsonResponse({'CODE':2, 'MESSAGE':'Acción no valida, Posible causa: Proyecto Eliminado.', 'DATA': "ERROR."})
            out = []
            evaluacion_accion = Evaluacion(descripcion = observaciones, fecha_reporte = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), valor_evaluacion = evaluacion)

            
            for x in evaluaciones:
                descripcion = ""
                evaluacion = ""
                archivo = ""
                if x.evaluacion.descripcion:
                    descripcion = x.evaluacion.descripcion
                else:
                    descripcion = "Sin observación"
                if int(x.evaluacion.valor_evaluacion) > 0:
                    if int(x.evaluacion.valor_evaluacion) == 1:
                        evaluacion = "ACEPTADO"
                    elif int(x.evaluacion.valor_evaluacion) == 2:
                        evaluacion = "RECHAZADO"
                    elif int(x.evaluacion.valor_evaluacion) == 3:
                        evaluacion = "DEVUELTO"
                else:
                    evaluacion = "No ha sido evaluado."
                
                if x.evaluacion.archivo:
                    archivo = x.evaluacion.archivo.id
                else:
                    archivo = "Sin archivo."
                out.append({'evaluador': str(x.usuario.user.documento+"~"+x.usuario.user.nombre), 'fecha_reporte': x.evaluacion.fecha_reporte.strftime("%Y-%m-%d %H:%M:%S"), 'observacion': descripcion, 'evaluacion': evaluacion, 'archivo' : archivo})
            
            if len(out) > 0:
                out = json.dumps(out)
                return JsonResponse({'CODE':1, 'MESSAGE':'Consulta realizada con exito.', 'DATA': out})    
            else:
                return JsonResponse({'CODE':2, 'MESSAGE':'No se encontraron registros.', 'DATA': "ERROR."})    
    except Exception as e:
        print(e)
        return JsonResponse({'CODE':2, 'MESSAGE':'Fallo del Servidor, consultar con soporte.', 'DATA': 'ERROR'})"""