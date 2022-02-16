<!-- INSIGNIAS DE PROYECTO -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues-open][issues-open-shield]][issues-url]
[![Issues-closed][issues-closed-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]
[![Code Size][code-size-shield][]

<!-- LOGOTIPO DEL PROYECTO -->
| plantilla-de-producción-de-express |
| :------------------------------------------------- -------------------------------------------------- ---: |
| ![app-icon][] |
| ¡Plantilla para backends con NodeJS + Express, lista para usar en producción! |
| [🐞 Informar de un error o 🙋‍♂️ solicitar una función][issues-url] |
| [![contribuciones bienvenidas][contribuciones-bienvenidas]][issues-url]
 [![Licencia][insignia-apache]][apache-license] |

- [Características] (#Características)
  - [Primeros pasos](#primeros pasos)
    - [Cómo usarlo](#cómo-usarlo)
  - [Requisitos previos](#requisitos previos)
    - [Instalación](#instalación)
    - [Establecer entornos](#set-environments)
  -[Descripción general del código](#descripción general del código)
  - [Dependencias](#dependencias)
  - [Estructura de la aplicación](#estructura-de-la-aplicación)
  - [Gestión de errores](#gestión-de-errores)
  -[Autenticación](#autenticación)
- [Colaboradores](#colaboradores)
  - [Referencias y felicitaciones](#referencias-y-felicitaciones)
    - [Usado:](#usado)
    - [Ideas](#ideas)
  - [Contribuyendo](#contribuyendo)
  - [Muestra tu apoyo](#muestra-tu-apoyo)
  - [Licencia](#licencia)

# Características

[![Framework][insignia-framework]][framework-url]
![javascript][]
![js nodo][]

- Soporte para patron async/await
- Implementación del logger WinstonJs
- Manejo de errores
- Migraciones de Postgres y soporte de seeds
- Validación de parámetros en solicitudes
- Especificación Open API implementada a través de swagger y swagger-ui
- Implementación JWT
- Variables de entorno para contener los valores de configuración del archivo `.env`
- Programación funcional con Middlewares y helpers
- Codificación estándar con Eslint y Prettier, esto ayuda a mantener las cosas en perspectiva.

[![Guía de estilo de JavaScript](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Tech Stack

| Categoria      | Nombre           |
| -------------- | -------------- |
| Lenguaje       | **TypeScript** |
| JS Runtime     | **Node**       |
| Framework Web  | **Express**    |
| Base De Datos  | **PostgreSQL** |
| ORM            | **TypeORM**    |
| Framework de   |                |
| pruebas        | **Jest**       |
| Autenticación  | **JWT**        |
| Linter         | **TSLint**     |
| Formateador    | **Prettier**   |

## Empezando

### Cómo usarlo

Este código está destinado a ejecutarse en un servidor accesible en línea, por lo que otros servicios pueden usarlo. Esta es una solución Rest API que utiliza operaciones básicas de creación, lectura, actualización y eliminación (CRUD) de la base de datos, así como un generador/validador de token básico (JWT).

Utiliza una API RESTful para ser utilizada por cualquier otro cliente, pero para la legibilidad humana también tiene `swagger` (¡incluso puede usarse como un panel de administración ad hoc!). Para usarlo desde un cliente, debe realizar solicitudes HTTP (S), por ejemplo, usando `curl`:

```sh
> curl http://localhost:8000/ping -v
> curl -d "email=example&password=example2" http://localhost:8000/api/v1/auth/login
```

Pero puede usar cualquier idioma o biblioteca: PHP, GO, C ++, Rust, etc. El único punto único es cómo administrar el JWT. Se decidió utilizar un encabezado llamado `x-access-token`, para evitar una forma normal de comprobar si hay tokens: el encabezado `Authorization: Bearer`. Esta es solo una medida de seguridad adicional. Para enviar un token JWT para una solicitud en un punto final protegido, DEBE usar el encabezado `x-access-token`.

## Pre requisitos

Antes de empezar necesitas tener algunos requisitos:

1. [Node.js](https://nodejs.org/en/) > v16.13.2

  Node.js es un entorno de ejecución para Javascript que nos permite usar el lenguaje fuera del navegador, en este caso lo usamos para configurar y ejecutar el servidor de desarrollo.

2. [NPM](https://www.npmjs.com/) > v8.1.2

    NPM es un administrador de paquetes para Node.js y viene instalado con él, lo usamos para instalar y administrar dependencias de aplicaciones.

3. [Git](https://git-scm.com/) > v2.0.0

    Git es un sistema de control de versiones de código, lo usamos para administrar las diferentes ramas del código.

4. Conexión a internet

5. [Visual Studio Code](https://code.visualstudio.com/) u otro editor de código (opcional)

### Instalación

Para que el servidor Node se ejecute localmente:

- Clonar este repositorio
- `npm install` para instalar todas las dependencias requeridas
- `npm run dev` (con experiencia similar a GUI en su terminal) para iniciar el servidor local

### Establecer entornos

```sh
> cp .env.example .env
> nano .env
```

Eliminar ramas locales eliminadas en el servidor remoto

```sh
> git fetch -p && for branch in `git branch -vv --no-color | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
```

Compruebe los estados de dependencias no utilizados y obsoletos: `npx depcheck # OR npx npm-check-updates`

## Descripción general del código

El código de este backend está hecho usando el lenguaje JavaScript y el tiempo de ejecución nodejs.org. Con un paquete llamado Express.js para crear el servidor, routers y middleware necesarios. También se utiliza PostgreSQL para proporcionar una capa de base de datos moderna, de código abierto y de alto rendimiento. Por último, el servidor tiene paquetes auxiliares para el desarrollo y la implementación para garantizar que esté listo para la producción a nivel empresarial. Escribir y compilar la corrección por Typescript.

Al igual que con la mayoría de las aplicaciones de Node.js, nos gustaría instalar Node y NPM en nuestra PC local para ejecutar el servidor o desarrollar código. Esta carpeta incluye todos los archivos necesarios para ejecutar el servidor local o en línea, solo tenga en cuenta que necesitará usar una terminal ya que aún no hay una GUI disponible.

Si desea desarrollar, debe configurar un buen entorno de desarrollo. En primer lugar, un buen editor de texto/IDE, prefiero usar Visual Studio Code, pero puede usar cualquier otra cosa. Para el uso de VSCode, proporciono archivos de configuración en la carpeta oculta `.vscode`.

Para obtener más información sobre el código, consulte la [descripción general del código] (docs/es/CODE_OVERVIEW.md).

## Dependencias

- [expressjs](https://github.com/expressjs/express) - El servidor para manejar y enrutar solicitudes HTTP
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware para validar JWT para autenticación
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Para generar JWT utilizados por autenticación
- [slug](https://github.com/dodo/node-slug) - Para codificar títulos en un formato compatible con URL

## Estructura de la aplicación


- `app.js` - El punto de entrada a nuestra aplicación. Este archivo define nuestro servidor express y lo conecta a MongoDB usando mongoose. También requiere las rutas y modelos que usaremos en la aplicación.
- `routes/` - Esta carpeta contiene las definiciones de ruta para nuestra API.
- `models/` - Esta carpeta contiene las definiciones de esquema para nuestros modelos.
## Manejo de errores

En `routes/api/index.js`, definimos un middleware de manejo de errores para manejar `ValidationError` de Mongoose. Este middleware responderá con un código de estado 422 y formateará la respuesta para tener mensajes de error que los clientes puedan entender.

## Autenticación

Las solicitudes se autentican mediante el encabezado "Autorización" con un JWT válido. Definimos dos middlewares express en `routes/auth.js` que se pueden usar para autenticar solicitudes. El middleware `required` configura el middleware `express-jwt` utilizando el secreto de nuestra aplicación y devolverá un código de estado 401 si la solicitud no se puede autenticar. Luego se puede acceder a la carga útil del JWT desde `req.payload` en el punto final. El middleware `optional` configura el `express-jwt` de la misma manera que `required`, pero *no* devolverá un código de estado 401 si la solicitud no se puede autenticar.

# Colaboradores

|   [Israel Laguan][author-github]    | ![email-icon][] Envíame un correo electrónico a [contact@israellaguan.com][author-email] / ![linkedin-icon][] Conectar a [my LinkedIn][author-linkedin] |
| :---------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|           ![author-pic][]           | ![banner][]                                                                                                                         |
|    [Victor Peña][victor-github]     | ![email-icon][] Envíame un correo electrónico a [victordev2002@gmail.com][victor-email] / ![linkedin-icon][] Conectar a [my LinkedIn][victor-linkedin]  |
|           ![victor-pic][]           |                                                                                                                                     |
| [Emmanuel Azócar][emmanuel-github]  |![email-icon][] Envíame un correo electrónico a [azocarmel@gmail.com][emmanuel-email]                                                                    |
|          ![emmanuel-pic][]          |                                                                                                                                     |
|   [Angelica Molina][ange-github]    |![email-icon][] Envíame un correo electrónico a [angeli.molina1@gmail.com][ange-email]                                                                   |
|            ![ange-pic][]            |                                                                                                                                     |
## Referencias y felicitaciones

### Usado:
https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
https://github.com/nfour/eslint-config-standard-typescript-prettier
https://codeql.github.com/
https://github.com/santoshshinde2012/node-boilerplate


### Ideas

https://github.com/MichielDeMey/express-jwt-permissions
https://www.medianova.com/en-blog/nodejs-exprees-for-jwt-auth-example/
https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html
https://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
https://github.com/cham11ng/typescript-api-starter // Have migrations with Postgres
https://caddyserver.com/docs/running
https://github.com/PW486/express-ts-starter // Have docker conf


## Contribuyendo

[![contributions welcome][contributions-welcome]][issues-url]

🤝 ¡Las contribuciones, los problemas y las solicitudes de funciones son bienvenidos!
Siéntase libre de revisar la [página de problemas][issues-url].

## Muestra tu apoyo

🤗 ¡Dale un ⭐️ si te gusta este proyecto!

Iconos de:

<a href="https://icons8.com/icon/13917/full-image">Icons8</a>
## Licencia

[![Licencia][insignia-apache]][licencia-apache]

📝 Este proyecto está bajo la licencia del [MIT]
Siéntete libre de bifurcar este proyecto y mejorarlo.

<!-- VÍNCULOS E IMÁGENES DE MARKDOWN -->
[contributors-shield]: https://img.shields.io/github/contributors/Azordev/backend-template?style=for-the-badge
[contributors-url]: https://github.com/Azordev/backend-template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Azordev/backend-template?style=for-the-badge
[forks-url]: https://github.com/Azordev/backend-template/network/members
[stars-shield]: https://img.shields.io/github/stars/Azordev/backend-template?style=for-the-badge
[stars-url]: https://github.com/Azordev/backend-template/stargazers
[issues-open-shield]: https://img.shields.io/github/issues/Azordev/backend-template?style=for-the-badge
[issues-url]: https://github.com/Azordev/backend-template/issues
[issues-closed-shield]: https://img.shields.io/github/issues-closed/Azordev/backend-template?style=for-the-badge
[badge-framework]: https://img.shields.io/badge/express.js-v4.x-9cf?style=for-the-badge
[framework-url]: https://expressjs.com/
[contributions-welcome]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge
[badge-apache]: https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge
[apache-license]: https://opensource.org/licenses/Apache-2.0
[javascript]: https://img.shields.io/badge/JAVASCRIPT-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript
[nodejs]: https://img.shields.io/badge/Node-16-339933?style=for-the-badge&logo=node.js
[app-icon]: https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png
[author-pic]: https://avatars2.githubusercontent.com/u/36519478?s=460&v=4
[author-github]: https://israel-laguan.github.io
[author-linkedin]: https://www.linkedin.com/in/israellaguan
[author-email]: mailto:contact@israellaguan.com
[banner]: https://github.com/Israel-Laguan/Israel-Laguan/raw/master/docs/banner.jpg
[linkedin-icon]: https://img.icons8.com/color/20/000000/linkedin.png
[email-icon]: https://img.icons8.com/color/20/000000/message-squared.png
[victor-github]: https://github.com/Katsu08
[victor-pic]: https://avatars.githubusercontent.com/u/66505715?v=4
[victor-email]: mailto:victordev2002@gmail.com
[victor-linkedin]: https://www.linkedin.com/in/v%C3%ADctor-pe%C3%B1a-348a3918a/
[emmanuel-github]: https://github.com/e-azocar
[emmanuel-pic]: https://avatars.githubusercontent.com/u/61360270?v=4
[emmanuel-email]: mailto:azocarmel@gmail.com
[ange-github]: https://github.com/angelik0828
[ange-pic]: https://avatars.githubusercontent.com/u/4030477?s=200&v=4
[ange-email]: mailto:angeli.molina1@gmail.com
[denis-github]: https://github.com/denisosuna
[denis-pic]: https://avatars.githubusercontent.com/u/21060798?v=4
[denis-email]: denisosuna@gmail.com
