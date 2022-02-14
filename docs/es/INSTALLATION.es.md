# Instalación

- [Instalación](#instalación)
  - [Inicio rápido] (#inicio rápido)
  - [Instalación detallada](#instalación-detallada)
    - [Requisitos previos](#requisitos previos)
    - [Versión corta](#versión-corta)
  - [Establecer variables ambientales](#establecer-variables-ambientales)
  - [Solución de problemas](#solución de problemas)

> Asumo que estás usando Linux o Mac, pero es similar en Windows. Al final hay una [FAQ](#troubleshooting) si te encuentras con problemas conocidos.

En primer lugar, debe clonar el código usando git (también puede simplemente [descargar el código] []).

```sh
> git clone https://github.com/Azordev/backend-template.git
> cd coolticket-server
```

Para que el servidor Node se ejecute localmente, tenemos 2 opciones, la larga y la corta. El corto es volverse elegante y usar Docker 🐋, en ese caso, vaya a [la siguiente sección] (#inicio rápido). Para una experiencia completa con Node, vaya a [Instalación detallada](#instalación-detallada).

## Inicio rápido

1.- Asegúrate de haber instalado [Docker Engine][] y [Docker Compose][].

2.- Abre una Terminal desde `coolticket-server/` (la carpeta con el archivo `docker-compose.yml`) y ejecuta

```sh
> docker-compose up
```
- Ingrese localhost:8000 en un navegador para ver la aplicación en ejecución, incluida una base de datos de prueba de `Dockerfile`.

Tenga en cuenta que obtendrá un entorno de desarrollo centrado en desarrollar código de nodo, con una base de datos de prueba en postgres ya conectada.

## Instalación detallada

Entonces, ¿quieres sentir el metal e instalar cosas (como una carpeta pesada `node_modules`) en tu PC? ¡Te tengo cubierto!

### Requisitos previos

- [ ] `npm` v8.1 +
- [ ] `nodo` v16.13 +
- [ ] Un buen terminal
- [ ] Un editor de texto como VSCode
- [ ] Un navegador como Firefox o Chrome, o un cliente como Postman/Insomnia para probar

### Version corta

```sh
> npm i
# or
> yarn install
```

Ahora debería tener todas las carpetas y archivos para ejecutar el servidor, el único problema es que necesitamos una base de datos que funcione. Con ese fin, exploremos 2 formas diferentes.

- OPCIÓN 1: Ejecute su propia base de datos
  - Descarga e instala PostgreSQL ([instrucciones][instalar postgres])
  - Asegúrese de haber instalado el servidor PostgreSQL ejecutando

    ```sh
    > psql
    # Deberías ver este nuevo aviso:
    postgres=#
    # Verifique que tenga acceso y pueda ejecutar consultas
    postgres=# SELECT version();
    # Debería devolver la versión de POSTGRES y alguna información adicional
    # Ahora, salga usando esto:
    postgres=#\q
    ```

  - Cree una base de datos (sin crear tablas) y copie las credenciales en el archivo `.env`
- OPCIÓN 2: Usar una base de datos en línea (como [Heroku's][herokus postgres])
  - Básicamente, simplemente gire una instancia y copie las credenciales en el entorno del proyecto.

En este punto, deberíamos tener 3 conjuntos de credenciales de bases de datos en el archivo `.env`. Si necesita más con esto, consulte [esta información] (#establecer-variables-ambientales). Cuando esté seguro de que las bases de datos funcionan y puede conectarse, pasemos a la migración y la inicialización.

- `set-db:dev` para dejar la base de datos lista para la siembra. Tenga en cuenta que esto borrará todos los datos existentes, si existen. Aplica todas las migraciones: crea tablas, sepáralas y prepárate para la acción.

- `npm run dev` para iniciar el servidor local

- Ingrese localhost:8000 en un navegador para ver la documentación de Swagger para el servidor.

## Establecer variables ambientales

Como somos profesionales aquí, necesitamos al menos 3 entornos: Desarrollo (para modificar el código a voluntad), Prueba (para verificar si todo funciona bien) y Producción (El que usarán los clientes). Cada uno necesita una base de datos diferente (puede usar la misma base de datos para desarrollo y prueba *si sabe lo que está haciendo*).

Este proyecto usa `dotenv` y `cross-env` para administrar variables ambientales y evitar exponer información valiosa como las credenciales de su servidor. Podemos poner toda la información secreta en el archivo `.env` ya que no se comparte en público (nota en `.gitignore` no estamos compartiendo este archivo). Pero también implica que debe encargarse de agregar los valores de las variables usted mismo.

Es por eso que puede ver en .env example que tenemos 4 conjuntos de variables:

- Credenciales de la base de datos de desarrollo, comenzando con `DEV_DB_`.
- Credenciales de la base de datos de prueba, comenzando con `TEST_DB_`.
- Credenciales de la base de datos DProduction, comenzando con `DB_`.
- Otras Variables

Las credenciales de cada base de datos tienen 6 tipos de variables:

```sh
DB_HOST= # Si está en local, es `localhost`; de lo contrario, es la dirección IP o de dominio
DB_DATABASE= # Este es el nombre de la base de datos, por ejemplo `test`
DB_USER= # El nombre del usuario que accede a postgres, por ejemplo `test`
DB_PORT= # Usualmente es `5432`
DB_PASSWORD= # Esta es la contraseña que configuró cuando creó el usuario utilizado, por ejemplo `prueba`
DATABASE_URL= # Este espacio es para bases de datos Heroku con el formato `postgres://<user>:<password>@<host>:<port>/<database>?ssl=true`
```


El último es especial. Si lo completa, contiene toda la información necesaria para que no se utilicen las otras variables. Puede pensar en ello como usar `*_DB_URL` O usar las otras variables. Ese estilo para las credenciales de base de datos se usa en Heroku como cuando se aprovisiona una aplicación de Heroku con un [Heroku'sPostgres Add on][herokus postgres], genera automáticamente la URL y aprovisiona su aplicación con dicha variable; de esa manera no tienes que entrometerte con las variables. Para cualquier otro caso utilice las otras variables.

Un problema habitual con el uso de `*_DB_URL` es que debe agregar `?ssl=true` al final para conectarse desde su PC local. Recuerde agregarlo al final, por ejemplo `postgres://<user>:<password>@<host>:<port>/<database>`**`?ssl=true`**

También tenga en cuenta que debe declarar el puerto. En algunos casos, deberá borrar la opción `*_DB_PORT` en `/service/postgres/credentials.js`.

Tenga en cuenta que debe completar 3 bases de datos, una para cada entorno (DEV, TEST y PROD). No olvide completar estas variables antes de iniciar el código o probarlo.

Para las otras variables:

```sh
JWT_SECRET= # Aquí puede agregar un secreto súper difícil de descubrir para JWT
PRODUCTION_URL= # Agregar un enlace a la lista blanca, esperado https://coolticket.herokuapp.com
```

> No pongas nada en el archivo .env-example, es solo para copiar=>pegar=>cambiar-nombre a `.env`. Si agrega variables a este archivo y confirma, está exponiendo su secreto al mundo, ¡incluso a algunos piratas informáticos hambrientos de bases de datos gratuitas!

---

> Por lo general, no necesita agregar comillas a ninguna variable, por lo que, por ejemplo, si su contraseña es "Sup3erS3cr3+", puede configurar la variable `DB_PASSWORD=Sup3erS3cr3+`. ¡Solo trate de no usar el símbolo de almohadilla (#) en su pase o cualquier variable! (en tal caso utilice comillas). Algunos caracteres también necesitan un símbolo de escape (por ejemplo, `\'` para obtener una cita `)

## Solución de problemas

Si se encontró con otro problema, no dude en comunicarse con la [Sección de problemas] [URL de problemas] y ayúdeme a depurar el código comentando su problema.

- Al migrar  `NODE_TLS_REJECT_UNAUTHORIZED is not a program... etc` en Windows, es decir, no reconoce las variables env.

> Descomenta la línea en el archivo `.npmrc` provisto. Consulta [este problema][npmrc issue] para obtener más información.

- \<Agregue su pregunta aquí>

[problema de npmrc]: https://github.com/kentcdodds/cross-env/issues/192#issuecomment-513341729
[descargar el código]: https://github.com/Azordev/backend-template/archive/main.zip
[Motor de Docker]: https://docs.docker.com/get-docker/
[Composición de Docker]: https://docs.docker.com/compose/install/
[instalar postgres]: https://www.postgresql.org/download/
[postgres de herokus]: https://www.heroku.com/postgres
[temas-url]: https://github.com/Azordev/backend-template/issues
