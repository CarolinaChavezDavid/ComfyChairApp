# ComfyChairApp

Aplicación para la organización de conferencias científicas.

## Estructura

### 💻ConfyChairApp 
La clase **'ConfyChairApp'** está diseñada para manejar la aplicación de gestión de conferencias. Sirve como punto central para el registro de usuarios y creación de conferencias.

<img width="918" alt="image" src="https://github.com/user-attachments/assets/486838b2-1967-45a1-a020-45ab34b37038">

### 🎓 Conferencia
La clase **'Conferencia'** gestiona la creación de sesiones o "tracks" dentro de una conferencia y realiza seguimiento de los usuarios registrados. También permite el registro de usuarios y el envío de publicaciones.

<img width="1037" alt="image" src="https://github.com/user-attachments/assets/110c9166-594b-47af-9cd9-09f3d34ed4d4">

### ⏱️ Sesiones
La clase Track representa una sesión o "track" en una conferencia donde se envían, revisan y seleccionan publicaciones (artículos y posters). Para la creación de los tracks se utiliza el patrón factory 🏭, implementado desde el método *'CreateTrack()'* en la clase **'Conference'**, luego para la implementación del método de selección elegido para cada track se usa el patrón strategy 🧱, para así obtener las implementaciones partículares de los distintos métodos y la posibilidad de crear nuevos métodos a futuro. Para el manejo de las diferentes etapas o estados dentro de cada track ('Reception', 'Bidding', 'Assigment', 'Review', 'Selection') se utiliza el patrón state ⏲️.

<img width="835" alt="image" src="https://github.com/user-attachments/assets/f80f8e36-3dad-418e-8511-248841717fda">

<img width="1107" alt="image" src="https://github.com/user-attachments/assets/b0a3cda3-2bb2-4727-be04-ba6b3bee92b1">


* **ReceptionState** extiende de TrackState y añade nuevo comportamiento para manjear la recepción de publicacioens y deadlines y maneja la transición al BiddingState.
  > ***Nota:** Para este estado se supone un deadline de 10 seg con el proposito de simular el deadline, durante este tiempo se permite el envio de publicaciones, estas son validadas de acuerdo a los requerimientos, si cumplen con las validaciones pasan del estado 'draft' a 'inReview', en el caso de no cumplir pasa al estado 'rejected' y no avanzan en el proceso. Luego de los 10 seg de deadline el track avanza al siguiente estado.*

<p align="center">
  <img src="https://github.com/user-attachments/assets/0c64e755-8320-4ed8-88c0-814f6e472828" alt="GIF" width="800" />
  <img src="https://github.com/user-attachments/assets/e0092498-c7a2-4715-ae72-8af70cec0e9e" alt="Image" width="600" />
</p>

* **BiddingState** extiende de TrackState y añade nuevo comportamiento para manjear el envio de bids por parte de los revisores y maneja la transición al AssigmentState.
    > ***Nota:** Para este estado se supone un deadline de 10 seg con el proposito de simular el deadline para el envio de bids por parte de los revisores. Incialmente se les notifica a los revisores registrados en la app cuales publicaciones estan disponibles para enviar bids. Luego del tiempo establecido para el envio de bids el track avanza al siguiente estado*

<p align="center">
  <img src="https://github.com/user-attachments/assets/35ada343-e8d1-4b5b-89f7-11adeeba0f29" alt="GIF" width="800" />
  <img src="https://github.com/user-attachments/assets/ed7e02c4-f5ed-450e-b4fa-2dac4a05d512" alt="Image" width="600" />
</p>

* **AssigmentState** extiende de TrackState y añade nuevo comportamiento para asignar las publicaciones a los revisores basado en los bids enviados en la etapa anterior, les notifica a los revisores cuales publicaciones deben revisar y luego de la asignación maneja la transición al ReviewState.

<p align="center">
  <img src="https://github.com/user-attachments/assets/ea1e9cb9-1994-476a-92ad-f07fa0704867" alt="Image" width="600" />
</p>

* **ReviewState** extiende de TrackState y añade nuevo comportamiento para manejar la revisión de las publicaciones, valida periodicamente si los revisores completaron sus reviews de forma correcta, en el caso contrario los notifica para que las completen. Luego de que se han enviado todas las revisiones maneja la transición al SelectionState.
 
<p align="center">
  <img src="https://github.com/user-attachments/assets/7c8106e7-eae4-4d13-8255-904108312713" alt="GIF" width="800" />
  <img src="https://github.com/user-attachments/assets/0f04e87c-9c66-4827-a652-ffa1f679cf03" alt="Image" width="600" />
</p>

* **SelectionState** extiende de TrackState y añade nuevo comportamiento para seleccionar las publicaciones de acuerdo al método que se establecio a la hora de crear el track. Luego finaliza el estado del track.

<p align="center">
  <img src="https://github.com/user-attachments/assets/cb9ec3d7-a2b5-4cdc-b22f-c510dd6e437f" alt="Image" width="600" />
</p>
  
### 👤Usuarios - 🪆Decorator pattern
Se opta por usar el patrón Decorador para añadir funcionalidades dinámicamente a los diferentes roles de los usuarios sin modificar la estructura base del usuario. Cada decorador (Reviewer, Chair, Author) envuelve la estructura original añadiendo nuevas funcionalidades y atributos específicos.

<img width="833" alt="image" src="https://github.com/user-attachments/assets/2bb70356-1194-486f-a568-8709c2d24ef5">

### 📑 Publicaciones
La implementación de publicaciones en la aplicación se baso unicamente en herencia, permitiendo que las subclases **'PosterPublication'** y **'RegularPublication'** hereden todos los atributos y métodos de la clase padre **'Publication'** promoviendo la reutilización de código y estableciendo una jerarquía entre clases. Luego de que publicaciónes son creada, solo pueden ser enviadas en el estado de recepción de una sesión, a partir de ese momento son realizadas las validación establecidas en los requerimientos de la apliación y pasan por diferentes estados: *'Draft'* cuando son creadas por primera vez en la aplicaión, *'InReview'* cuando se envia a la sesión, *'Rejected'* en caso de que no cumpla con alguna validación o cuando en la etapa de selección de la sesión no dentra detro del criterio de aceptación y por último *'Approved'* en caso de que sea aceptada en la sesión de la conferencia a la que fue enviada. Durante la etapa asignación de la sesión, se asignan los revisores a la publicación y en el estado de revisión se le envian **'Reviews'**.

<img width="755" alt="image" src="https://github.com/user-attachments/assets/ae011a7c-7832-405e-b232-46db0251acff">

### 🧪 Test Coverage
Para los test de la aplicación se probajron los flujos de las clases **'Conference'**, **'Track'**, **'Publication'** y **'User'** con el fin de validar el correcto funcionamiento.

![image](https://github.com/user-attachments/assets/329732cf-f069-4219-84a3-12ce64bc4444)






