# ComfyChairApp


## Estructura
### 👤Usuarios - 🪆Decorator pattern
Se opta por usar el patrón Decorador para añadir funcionalidades dinámicamente a los diferentes roles de los usuarios sin modificar la estructura base del usuario. Cada decorador (Reviewer, Chair, Author) envuelve la estructura original del usuario y permite añadir nuevas funcionalidades y atributos específicos para cada rol.
<img width="833" alt="image" src="https://github.com/user-attachments/assets/2bb70356-1194-486f-a568-8709c2d24ef5">



👾
## Decorator: El patron decorador fue implementado para que los usuarios pudieran adquirir de forma fliexible y dinamica diferentes roles

## Factory: Para la creacion de sesiones dentro de las conferencias

## State pattern: para la secuencias o estados de la sesiones (recepcion, biding, asignacion y revision, y seleccion)

* suposiciones: se establece un tiempo de duracion para la etapa de recepcion de cada sesion, para fines practicos a la hora de testear se supone que el tiempo de recepcion es de 30 segndos
