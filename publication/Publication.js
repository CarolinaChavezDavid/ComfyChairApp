const Constants = require("../utils/Constants");

class Publication {
  constructor(title, attachedFile, leadAuthor) {
    this.title = title;
    this.attachedFile = attachedFile;
    this.authors = []
    this.leadAuthor = leadAuthor;
    this.state = Constants.PUBLICATION_STATE.DRAFT;
    this.sendDate = new Date();
    this.finalScore = 0;

    this.bids = []
    this.reviewers = []
    this.reviews = []
  }

  updateState(newState) {
    this.state = newState;
  }

  getType() {
    throw new Error("El método 'getType()' debe ser implementado.");
  }

  submitReview(review) {
    this.reviews.push(review)
  }

  addAuthor(user) {
    this.authors.push(user)
  }

  getPublicationInfo() {
    console.log(`Publicacion ${this.title}, estado: ${this.state}, tipo: ${this.getType()}`)
  }

  hasMaxReviewes() {
    return this.reviewers.length === Constants.MAX_PUBLICATION_REVIEWS
  }

  calculateFinalScore() {
    const totalScore = this.reviews.reduce((sum, review) => sum + review.score, 0);
    this.finalScore = totalScore / this.reviews.length;
  }
}

module.exports = Publication;