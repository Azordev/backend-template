# Descripción general del código

- [Descripción general del código](#code-overview)
  - [Dependencias interesantes](#dependencias-interesantes)
  - [Estructura de la aplicación](#estructura-de-la-aplicación)
  - [Gestión de errores](#gestión-de-errores)
  - [Autenticación](#autenticación)
  - [Bases de datos](#bases de datos)
  - [Solicitudes básicas](#solicitudes-básicas)

## Dependencias interesantes

- [expressjs](https://github.com/expressjs/express) - El servidor para manejar y enrutar solicitudes HTTP
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware para validar JWT para autenticación
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Para generar JWT utilizados por autenticación
- [node-postgres](https://github.com/brianc/node-postgres) - Para conectarse a una base de datos postgres

## Estructura de la aplicación

- `index.js` El punto de entrada a nuestra aplicación. Este archivo define nuestro servidor express y lo conecta a todos los middleware necesarios. También requiere las rutas y modelos que usaremos en la aplicación.
- `api/` Esta carpeta contiene las definiciones de ruta para nuestra API.
- `migrations/` Aquí tenemos algunas migraciones (en SQL para facilitar la portabilidad) para ejecutar antes de iniciar el servidor.
- `server/` Esta carpeta contiene la configuración de la aplicación, así como una ubicación central para las variables de configuración/entorno.
- `service/` Esta carpeta contiene las acciones y consultas para cada Tabla.

## Manejo de errores

Tenga en cuenta que el código no usa `console.log()`, sino que usa un registrador personalizado creado con `winston` y `morgan`. Todos los eventos importantes se guardan en la carpeta `logs/` y se muestran en la terminal. Entonces, si se encuentra con algún error y desea verificar la información disponible, ¡visite la carpeta `logs/`!

Si ocurre un error, el servidor debe reiniciarse como si estuviera usando `nodemon` en desarrollo y `pm2` en producción. También tenga en cuenta que utilicé ampliamente `try... catch` para evitar errores no controlados.

En `api/v1/index.js`, definimos un middleware de manejo de errores para manejar entradas: `ValidationError`. Este middleware responderá con un código de estado 422 y formateará la respuesta para tener mensajes de error que los clientes puedan entender.

## Autenticación

Las solicitudes se autentican mediante el encabezado "Autorización" con un JWT válido. Definimos dos middlewares express en `service/auth.js` que se pueden usar para autenticar solicitudes. El middleware `required` configura el middleware `express-jwt` utilizando el secreto de nuestra aplicación y devolverá un código de estado 401 si la solicitud no se puede autenticar. Luego se puede acceder a la carga útil del JWT desde `req.payload` en el punto final. El middleware `optional` configura el `express-jwt` de la misma manera que `required`, pero *no* devolverá un código de estado 401 si la solicitud no se puede autenticar.

## Bases de datos

Decidí usar Postgres como mi base de datos, ya que es una opción moderna, potente y de código abierto. Tampoco uso un ORM, ya que generalmente no lo necesitamos si conocemos alguna compilación de consulta SQL (o podemos usar Google).

Definí algunas migraciones para iniciar un nuevo servidor, puede usarlo ejecutando `npm run set-db:dev` y hacer que se ejecuten las migraciones y la semilla.

Para bases de datos, recomiendo usar Heroku Free Tier. Si desea verificar los cambios en las bases de datos, le recomiendo [pgweb] (https://pgweb-demo.herokuapp.com/).

## Solicitudes básicas

- GET `/ping`

```sh
curl http://localhost:8000/ping
```

- POST `/api/v1/auth/signup`

```sh
curl --data-urlencode "name=Israel Antonio Rosales Laguan" \
  -d "email=user@mail.com&password=5236987410." \
  http://localhost:8000/api/v1/auth/signup
```

- POST `/api/v1/auth/login`

```sh
curl -d "email=user@mail.com&password=5236987410." \
  http://localhost:8000/api/v1/auth/login
```
