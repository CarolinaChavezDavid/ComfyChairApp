const Constants = require("../../utils/Constants");
const AssigmentState = require("../state/AssignmentState");
const BiddingState = require("../state/BiddingState");
const ReceptionState = require("../state/ReceptionState");
const RevisionState = require("../state/RevisionState");
const SelectionState = require("../state/SelectionState");

class Track {
  constructor(topic, selectionMethod) {
    this.topic = topic;
    this.selectionMethod = selectionMethod;
    this.publications = [];
    this.users = [];

    this.receptionState = new ReceptionState(this, 10000);
    this.biddingState = new BiddingState(this, 3000);
    this.assigmentState = new AssigmentState(this);
    this.revisionState = new RevisionState(this);
    this.selectionState = new SelectionState(this);
    this.setState(this.receptionState);
  }

  setState(state) {
    if (this.currentState && typeof this.currentState.cleanup === 'function') {
      this.currentState.cleanup();  // Limpiar el temporizador del estado anterior
    }
    this.currentState = state;
    this.currentState.init();
  }

  getReviewers() {
    const reviewers = this.users.filter(user => user.hasRole(Constants.USER_ROLE.REVIEWER));
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
    if (publication.state == Constants.PUBLICATION_STATE.IN_REVIEW) {
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

    this.currentState.submitBid(publication, interestLevel, reviewer);
  }

  submitReview(publication, score, message, reviewer) {
    if (!this.users.includes(reviewer)) {
      throw new Error(`El usuario ${reviewer.name}  no esta registrado en la conferencia.`);
    }
    if (!this.getReviewers().includes(reviewer)) {
      throw new Error(`El usuario ${reviewer.name} no tiene el rol de revisor.`);
    }

    if (!(this.currentState instanceof RevisionState)) {
      throw new Error('Solo se puede enviar revisiones en la etapa de revisión.');
    }

    this.currentState.submitReview(publication, score, message, reviewer);
  }

  getType() {
    throw new Error("El método 'getType()' debe ser implementado.");
  }

  isPublicationAvailableType(publicationType) {
    throw new Error("El método 'isPublicationAvailableType()' debe ser implementado.");
  }

  finalizeTrack() {
    console.log(`La organización de la sesión "${this.topic}" ha finalizado`)
  }

  notifyReviwers() {
    this.getReviewers().forEach(reviewer => {
      reviewer.updateBidingState(this.publications)
    });
  }

  removeRejectedPublications() {
    this.publications.forEach((publication, index) => {
      if (publication.state === Constants.PUBLICATION_STATE.REJECTED) {
        this.publications.splice(index, 1);
      }
    });
  }

  getTrackInfo() {
    console.log(`Sesión de ${this.topic} de tipo ${this.getType()}, articulos presentados: ${this.publications.length}, usuarios registrados: ${this.users.length}`)
  }

}

module.exports = Track;