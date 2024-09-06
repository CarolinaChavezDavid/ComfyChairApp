# ComfyChairApp


## Estructura

### 💻ConfyChairApp 
La clase  es creada para centralizar 

La clase **'ConfyChairApp'** está diseñada para gestionar la aplicación de gestión de conferencias. Sirve como punto central para manegar los registros de usuarios y crear conferencias.

<img width="918" alt="image" src="https://github.com/user-attachments/assets/486838b2-1967-45a1-a020-45ab34b37038">

### 🎓 Conferencia
La clase **'Conferencia'** gestiona la creación de sesiones dentro de una conferencia y realiza un seguimiento de los usuarios registrados. También permite el registro de usuarios y el envío de publicaciones.

<img width="1037" alt="image" src="https://github.com/user-attachments/assets/110c9166-594b-47af-9cd9-09f3d34ed4d4">

### ⏱️ Sesiones
La clase Track representa una sesión o "track" en una conferencia donde se envían, revisan y seleccionan publicaciones (artículos y posters). Para la creación de los tracks se utiliza el patron factory 🏭, implementado desde el método *'CreateTrack()'* en la clase **'Conferencia'**, luego para el método de selección elegido para cada track se usa el patrón strategy 🧱, para obtener las implementaciones partículares de los distintos métodos y la posibilidad de crear nuevos métodos a futuro. Para el manejo de las diferentes etapas o estados dentro de cada track ('Reception', 'Bidding', 'Assigment', 'Review', 'Selection') se utiliza el patrón state ⏲️.

<img width="835" alt="image" src="https://github.com/user-attachments/assets/f80f8e36-3dad-418e-8511-248841717fda">

ReceptionState extiende de TrackState y añade nuevo comportamiento para manjear la recepción de aplicaciones y deadlines r
  
### 👤Usuarios - 🪆Decorator pattern
Se opta por usar el patrón Decorador para añadir funcionalidades dinámicamente a los diferentes roles de los usuarios sin modificar la estructura base del usuario. Cada decorador (Reviewer, Chair, Author) envuelve la estructura original del usuario y permite añadir nuevas funcionalidades y atributos específicos para cada rol.
<img width="833" alt="image" src="https://github.com/user-attachments/assets/2bb70356-1194-486f-a568-8709c2d24ef5">

### 📑 Publicaciones
La implementación de publicaciones en la aplicación se baso unicamente en herencia, permitiendo que las subclases **'PosterPublication'** y **'RegularPublication'** hereden todos los atributos y métodos de la clase padre **'Publication'** promoviendo la reutilización de código y estableciendo una jerarquía entre clases. Luego de que publicaciónes son creada, solo pueden ser enviadas en el estado de recepción de una sesión, a partir de ese momento son realizadas las validación establecidas en los requerimientos de la apliación y pasan por diferentes estados: *'Draft'* cuando son creadas por primera vez en la aplicaión, *'InReview'* cuando se envia a la sesión, *'Rejected'* en caso de que no cumpla con alguna validación o cuando en la etapa de selección de la sesión no dentra detro del criterio de aceptación y por último *'Approved'* en caso de que sea aceptada en la sesión de la conferencia a la que fue enviada. Durante la etapa asignación de la sesión, se asignan los revisores a la publicación y en el estado de revisión se le envian **'Reviews'**.

<img width="755" alt="image" src="https://github.com/user-attachments/assets/ae011a7c-7832-405e-b232-46db0251acff">



### Test Coverage

![image](https://github.com/user-attachments/assets/329732cf-f069-4219-84a3-12ce64bc4444)






