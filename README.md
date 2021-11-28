# Evaluador Proyectos

[![Django](./build/static/markdown/django.png =200x200)](https://docs.djangoproject.com/en/3.2/)
[![NodeJs](./build/static/markdown/nodejs.jpg =200x200)](https://nodejs.org/es/)
[![ReactJs](./build/static/markdown/reactjs.png =200x200)](https://es.reactjs.org)

El proyecto esta desplegado en un servidor web de heroku, desarrollada con tecnologia Python (Django) y JavaScript (ReactJs libreria usada con Node.js).

## Tecnologias

Evaluador Proyectos usar varias tecnologias las cuales son:

- [NodeJs] - es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.
- [ReactJS] - es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página.
- [Django] - es un framework de desarrollo web de código abierto, escrito en Python, que respeta el patrón de diseño conocido como modelo–vista–controlador.

## Requerimientos

- Python v3.10.0
- Pip v21.3.1
- NodeJs v16.13.0


## Instalación

El proyecto requiere de NodeJs v16.13.0, Python v3.10.0 (La version 3.9 tambien es compatible) para su funcionamiento correcto.

> Nota: Situados en la carpeta del proyecto

Instalando dependencias para el funcionamiento con ReactJs.
```sh
npm install
```

Instalando librerias de Django y python necesarias para el funcionamiento de la api-rest.
```sh
pip install -r requirements.txt
```
Para ver reflejados modificaciones en el proyecto en local o en el entorno de producción...

```sh
npm run build
```

## Despliegue local

Para el funcionamiento en local con base de datos crear un archivo .env en la ruta raiz del proyecto definiendo las variables


```sh
DATABASE_NAME=XXXXXX
DATABASE_PASSWORD=XXXXX
DATABASE_PORT=XXXX
DATABASE_URL=XXXXXXX
DATABASE_USERNAME=XXXXXX
DATABASE_HOST=XXXXXX
```
> **Desarrolladores :**
> Luis Alfredo Mejias Valero - 1151839
> Alberto José Vergara Vera - 1151840
> **Aprendizaje a cargo del Ingeniero:**
> Freddy Humberto Vera

>**Este proyecto es desarrollado con fines academicos y no lucrativos**

   [NodeJs]: <https://nodejs.org/es/docs/>
   [Django]: <https://docs.djangoproject.com/en/3.2/>
   [ReactJs]: <https://es.reactjs.org/docs/getting-started.html>


