from django.urls import path
from django.urls.resolvers import URLPattern
from .views import *
urlpatterns = {
    path('registrar_usuarios', registrar_usuario, name='registrar_usuario' ),
    path('login', login, name='login' ),
    path('proyectos/postular_proyecto', postular_proyecto, name='postular_proyecto' ),
    path('proyectos/consultar_proyectos_admin', consultar_proyectos_admin, name='consultar_proyecto_admin' ),
    path('proyectos/consultar_proyectos_autor', consultar_proyectos_autor, name='consultar_proyecto_autor' ),
    path('proyectos/modificar_proyectos_autor', modificar_proyectos_autor, name='modificar_proyecto_autor' ),
}