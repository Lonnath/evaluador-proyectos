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
    path('api/proyectos/postular_proyecto', postular_proyecto, name='postular_proyecto'),
    path('api/proyectos/consultar_proyectos', consultar_proyectos, name='consultar_proyectos'),
    path('api/proyectos/consultar_proyectos_evaluar', consultar_proyectos_evaluar, name='consultar_proyectos_evaluar'),
    path('api/proyectos/eliminar_proyectos', eliminar_proyectos, name='eliminar_proyecto'),
    path('api/proyectos/modificar_proyectos', modificar_proyectos, name='modificar_proyecto'),
    path('api/consultar_evaluadores', consultar_evaluadores, name='consultar_evaluadores'),
    path('api/consultar_evaluaciones', consultar_evaluaciones, name='consultar_evaluaciones'),
    path('api/consultar_evaluaciones_evaluador', consultar_evaluaciones_evaluador, name='consultar_evaluaciones_evaluador'),
    path('api/asignar_evaluador', asignar_evaluador, name='asignar_evaluador'),
    path('api/evaluar_proyecto_evaluador', evaluar_proyecto_evaluador, name='evaluar_proyecto_evaluador'),
]
