# USO DE GIT:

Hay algunas reglas que se aplican al interactuar con el repositorio del proyecto. Esto nos permitirá tener un estándar que cualquier desarrollador pueda entender. Es importante cumplir con estas reglas para que la herramienta de linting nos permita usar el repositorio.

**Rama:**

Cada vez que se le asigna un problema, debe crear una nueva branch. Esto se puede hacer a través del comando:

```
git branch <nombre de la rama>
```

Por conveniencia, las branches deben tener una estructura definida. Por ejemplo, si el issue se trata de agregar una nueva función, la rama debería ser:

```
feature/#número-de-issue-breve-descripción-de-la-función
```

Supongamos que tenemos el issue n.° 12 que nos pide que agreguemos un encabezado a la página principal. Entonces, la rama quedaría de la siguiente manera:

```
feature/#12-añadir-encabezado-a-la-página-principal
```

Si se trata de solucionar un bug, solo tenemos que anteponer la palabra "fix". Por ejemplo:

```
fix/#14-remove-bad-media-queries-in-rating-component
```

**Commits:**

Al igual que las ramas, los commits también deben seguir un formato. Observe cómo varía el mensaje de confirmación si se trata de una función o de una corrección de errores.

**feat**: encabezado añadido a la página principal

**fix**: se eliminaron las consultas de medios incorrectas en el componente de calificación

**Pull Request (PR):**

Los PR’s son solicitudes que como desarrolladores hacemos una vez completada la solución de un problema y queremos que el código se integre a la rama maestra del proyecto. Antes de eso, debemos asegurarnos de que nuestro código sea completamente funcional y se adhiera a las mejores prácticas.

Una vez que hayamos hecho un `commit` y hayamos hecho `push` en nuestra rama, aparecerá una notificación con fondo amarillo en el repositorio de `github` y nos pedirá que continuemos con el PR. En el TextArea para realizar el PR encontrará varias secciones que desea completar: una breve descripción de lo que hizo, una captura de pantalla (si corresponde), las tareas que se completaron y los pasos para visualizarlas.
