const Constants = require("../utils/Constants");

class Publication {
  constructor(title, attachedFile, leadAuthor) {
    this.title = title;
    this.attachedFile = attachedFile;
    this.authors = []
    this.leadAuthor = leadAuthor;
    this.state = 'draft';
    this.sendDate = new Date();

    this.bids = []
    this.reviews = []
  }

  updateState(newState) {
    this.state = newState;
  }

  getType() {
    throw new Error("El método 'getType()' debe ser implementado.");
  }


  addAuthor(user) {
    this.authors.push(user)
  }

  getPublicationInfo() {
    console.log(`Publicacion ${this.title}, estado: ${this.state}, tipo: ${this.getType()}`)
  }

  addReview(review) {
    this.reviews.push(review);
  }

  getInterestedInfo(){
  this.reviews.forEach(item => console.log(`usuario interesado ${item.reviewer.name}`))
  }

  hasMaxReviwes(){
    return this.reviews.length === Constants.MAX_REVIEWS
  }
}

module.exports = Publication;