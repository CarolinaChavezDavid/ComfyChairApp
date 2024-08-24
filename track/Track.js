const AssigmentState = require("./AssignmentState");
const BiddingState = require("./BiddingState");
const ReceptionState = require("./ReceptionState");

class Track {
  constructor(topic, deadline, acceptanceMethod) {
    this.topic = topic
    this.deadline = deadline
    this.acceptanceMethod = acceptanceMethod
    this.publications = []
    this.users = []

    this.receptionState = new ReceptionState(this, deadline)
    this.biddingState = new BiddingState(this, 12000)
    this.assigmentState = new AssigmentState(this)
    this.setState(this.receptionState)
  }

  setState(state) {
    this.currentState = state;
    this.currentState.init()
  }

  getReviewers() {
    const reviewers = this.users.filter(user => user.hasRole('reviewer'));
    return reviewers;
  }

  registerUser(user) {
    this.users.push(user)
  }

  submitPublication(publication, user) {
    if (!this.users.includes(user)) {
      throw new Error(`El usuario ${publication.leadAuthor.name}  no esta registrado en la conferencia.`);
    }
    if (!(this.currentState instanceof ReceptionState)) {
      throw new Error('Solo se puede enviar publicacion en la etapa de recepcion.');
    }

    if (!this.isPublicationAvailableType(publication.getType())) {
      throw new Error(`El tipo de la publicación es incorrecto para la sesion`);
    }
    this.currentState.submitPulication(publication, user);
    if (publication.state == 'inReview') {
      this.publications.push(publication);
    }
  }

  submitBid(publication, interestLevel, reviewer) {
    if (!this.users.includes(reviewer)) {
      throw new Error(`El usuario ${reviewer.name}  no esta registrado en la conferencia.`);
    }
    if (!this.getReviewers().includes(reviewer)) {
      throw new Error(`El usuario ${reviewer.name} no tiene el rol de revisor.`);
    }

    if (!(this.currentState instanceof BiddingState)) {
      throw new Error('Solo se puede enviar bids en la etapa de bidding.');
    }

    this.currentState.submitBid(publication, interestLevel, reviewer)
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
    this.publications.forEach((publication, index) => {
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