# ComfyChairApp


## Estructura
### 👤Usuarios - 🪆Decorator pattern
Se opta por usar el patrón Decorador para añadir funcionalidades dinámicamente a los diferentes roles de los usuarios sin modificar la estructura base del usuario. Cada decorador (Reviewer, Chair, Author) envuelve la estructura original del usuario y permite añadir nuevas funcionalidades y atributos específicos para cada rol.
<img width="833" alt="image" src="https://github.com/user-attachments/assets/2bb70356-1194-486f-a568-8709c2d24ef5">

### 📑 Publicaciones
La implementación de publicaciones en la aplicación se baso unicamente en herencia, permitiendo que las subclases 'PosterPublication' y 'RegularPublication' hereden todos los atributos y métodos de la clase padre 'Publication' promoviendo la reutilización de código y estableciendo una jerarquía entre clases. Luego de que publicaciónes son creada, solo pueden ser enviadas en el estado de recepción de una sesión, a partir de ese momento son realizadas las validación establecidas en los requerimientos de la apliación y pasan por diferentes estados: 'Draft' cuando son creadas por primera vez en la aplicaión, 'InReview' cuando se envia a la sesión, 'Rejected' en caso de que no cumpla con alguna validación o cuando en la etapa de selección de la sesión no dentra detro del criterio de aceptación y por último 'Approved' en caso de que sea aceptada en la sesión de la conferencia a la que fue enviada. Durante la etapa asignación de la sesión, se asignan los revisores a la publicación y en el estado de revisión se le envian 'Reviews'.

<img width="1090" alt="image" src="https://github.com/user-attachments/assets/144356e1-ffa1-4580-9539-3a29a9f4fcaf">



## Decorator: El patron decorador fue implementado para que los usuarios pudieran adquirir de forma fliexible y dinamica diferentes roles

## Factory: Para la creacion de sesiones dentro de las conferencias

## State pattern: para la secuencias o estados de la sesiones (recepcion, biding, asignacion y revision, y seleccion)

* suposiciones: se establece un tiempo de duracion para la etapa de recepcion de cada sesion, para fines practicos a la hora de testear se supone que el tiempo de recepcion es de 30 segndos
