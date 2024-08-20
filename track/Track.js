const BiddingState = require("./BiddingState");
const ReceptionState = require("./ReceptionState");

class Track {
  constructor(topic, deadline, acceptanceMethod) {
    this.topic = topic
    this.deadline = deadline
    this.acceptanceMethod = acceptanceMethod
    this.publications = []
    this.users = []


    this.receptionState = new ReceptionState()
    this.biddingState = new BiddingState()
    this.currentState = this.receptionState

    setTimeout(() => {
      this.setState(this.biddingState);
      console.log(`La sesion "${this.topic}" ha pasado al estado de biddnig.`);
  }, deadline);
  }

  setState(state) {
    this.currentState = state;
  }

  submitPublication(publication, user) {
    if (!(this.currentState instanceof ReceptionState)) {
      throw new Error('Solo se puede enviar publicacion en la etapa de recepcion.');
    }

    if (!this.isPublicationAvailableType(publication.getType())) {
      throw new Error(`El tipo de la publicación es incorrecto para la sesion`);
    }
    this.currentState.submitPulication(publication)
    if (publication.state == 'inReview') {
      this.publications.push(publication);
      if (!this.isUserRegistered(user)) {
        this.users.push(user)
      }
    }

  }

  isUserRegistered(user) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === user.email) {
        return true;
      }
    }
    return false;
  }

  getType() {
    throw new Error("El método 'getType()' debe ser implementado.");
  }

  isPublicationAvailableType(publicationType) {
    throw new Error("El método 'isPublicationAvailableType()' debe ser implementado.");
  }

  getTrackInfo() {
    console.log(`Sesión de ${this.topic} de tipo ${this.getType()}, articulos presentados: ${this.publications.length}, usuarios registrados: ${this.users}`)
  }

}

module.exports = Track;