const BiddingState = require("./BiddingState");
const ReceptionState = require("./ReceptionState");

class Track {
  constructor(topic, deadline, acceptanceMethod, users) {
    this.topic = topic
    this.deadline = deadline
    this.acceptanceMethod = acceptanceMethod
    this.publications = []
    this.users = users

    this.receptionState = new ReceptionState(this, deadline)
    this.biddingState = new BiddingState(this, 12000)
    this.currentState = this.receptionState
  }

  setState(state) {
    this.currentState = state;
  }

  getReviewers() {
    const reviewers = this.users.filter(user => user.hasRole('reviewer'));
    return reviewers;
}

  submitPublication(publication) {
    if (!(this.currentState instanceof ReceptionState)) {
      throw new Error('Solo se puede enviar publicacion en la etapa de recepcion.');
    }

    if (!this.isPublicationAvailableType(publication.getType())) {
      throw new Error(`El tipo de la publicación es incorrecto para la sesion`);
    }
    this.currentState.submitPulication(publication)
    if (publication.state == 'inReview') {
      this.publications.push(publication);
    }
  }

  getType() {
    throw new Error("El método 'getType()' debe ser implementado.");
  }

  isPublicationAvailableType(publicationType) {
    throw new Error("El método 'isPublicationAvailableType()' debe ser implementado.");
  }

  notifyReviwers() {
    this.getReviewers().forEach(reviewer => {
      reviewer.updateBidingState(this.publications)
    });
  }

  removeRejectedPublications() {
    this.publications.forEach( (publication, index) => {
        if (publication.state === 'rejected') {
            this.publications.splice(index, 1);
        }
    });
}

  getTrackInfo() {
    console.log(`Sesión de ${this.topic} de tipo ${this.getType()}, articulos presentados: ${this.publications.length}, usuarios registrados: ${this.users.length}`)
  }

}

module.exports = Track;