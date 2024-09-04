# ComfyChairApp


## Estructura

### 💻ConfyChairApp 
La clase  es creada para centralizar 

La clase **'ConfyChairApp'** está diseñada para gestionar la aplicación de gestión de conferencias. Sirve como punto central para manegar los registros de usuarios y crear conferencias.

<img width="1306" alt="image" src="https://github.com/user-attachments/assets/2daa767a-1caa-4331-8590-50c78d68f11a">

### Conferencia
### ⏱️ Sesiones

* #### ⏱️ Creación de Sesiones - 🏭 Factory pattern
* #### ⏱️ Etapas de Sesiones - ⏲️ State pattern
* #### Criterios de aceptación - 🧱 Strategy pattern
  
### 👤Usuarios - 🪆Decorator pattern
Se opta por usar el patrón Decorador para añadir funcionalidades dinámicamente a los diferentes roles de los usuarios sin modificar la estructura base del usuario. Cada decorador (Reviewer, Chair, Author) envuelve la estructura original del usuario y permite añadir nuevas funcionalidades y atributos específicos para cada rol.
<img width="833" alt="image" src="https://github.com/user-attachments/assets/2bb70356-1194-486f-a568-8709c2d24ef5">

### 📑 Publicaciones
La implementación de publicaciones en la aplicación se baso unicamente en herencia, permitiendo que las subclases **'PosterPublication'** y **'RegularPublication'** hereden todos los atributos y métodos de la clase padre **'Publication'** promoviendo la reutilización de código y estableciendo una jerarquía entre clases. Luego de que publicaciónes son creada, solo pueden ser enviadas en el estado de recepción de una sesión, a partir de ese momento son realizadas las validación establecidas en los requerimientos de la apliación y pasan por diferentes estados: *'Draft'* cuando son creadas por primera vez en la aplicaión, *'InReview'* cuando se envia a la sesión, *'Rejected'* en caso de que no cumpla con alguna validación o cuando en la etapa de selección de la sesión no dentra detro del criterio de aceptación y por último *'Approved'* en caso de que sea aceptada en la sesión de la conferencia a la que fue enviada. Durante la etapa asignación de la sesión, se asignan los revisores a la publicación y en el estado de revisión se le envian **'Reviews'**.

<img width="1090" alt="image" src="https://github.com/user-attachments/assets/144356e1-ffa1-4580-9539-3a29a9f4fcaf">


### Test Coverage

![image](https://github.com/user-attachments/assets/329732cf-f069-4219-84a3-12ce64bc4444)






