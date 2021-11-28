"""evaluador_proyectos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from api.views import *
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # INTERFACE URLS
    path('Admin', TemplateView.as_view(template_name="index.html")),
    path('AssignProjects', TemplateView.as_view(template_name="index.html")),
    path('ModifyProjectsAdmin', TemplateView.as_view(template_name="index.html")),
    path('Evaluator', TemplateView.as_view(template_name="index.html")),
    path('EvaluateProjects', TemplateView.as_view(template_name="index.html")),
    path('CreateProjectEvaluator', TemplateView.as_view(template_name="index.html")),
    path('User', TemplateView.as_view(template_name="index.html")),
    path('CreateProjectUser', TemplateView.as_view(template_name="index.html")),
    path('RegisterUser', TemplateView.as_view(template_name="index.html")),
    path('RecoveryAccount', TemplateView.as_view(template_name="index.html")),
    path('', TemplateView.as_view(template_name="index.html")),

    # API URLS

    path('api/registrar_usuarios', registrar_usuarios, name='registrar_usuarios' ),
    path('api/login', login, name='login' ),
    path('api/proyectos/postular_proyecto', postular_proyecto, name='postular_proyecto' ),
    path('api/proyectos/consultar_proyectos_admin', consultar_proyectos_admin, name='consultar_proyecto_admin' ),
    path('api/proyectos/consultar_proyectos_autor', consultar_proyectos_autor, name='consultar_proyecto_autor' ),
    #path('api/proyectos/modificar_proyectos_autor', modificar_proyectos_autor, name='modificar_proyecto_autor' ),
    path('api/proyectos/eliminar_proyectos_autor', eliminar_proyectos_autor, name='eliminar_proyecto_autor' ),
]
