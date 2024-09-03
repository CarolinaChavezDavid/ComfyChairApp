const UserRoleDecorator = require('./UserRoleDecorator');

class ReviewerRole extends UserRoleDecorator {
  constructor(user) {
    super(user);
    super.addRole('reviewer')
    this.user = user

    this.reviews = []
    this.reviewRequests = []
  }

  updateBidingState(publications) {
    console.log(`El revisor ${this.user.name}, podra enviar bids a las siguientes publicaciones: ${publications.map(pub => pub.title).join(', ')}`);
  }

  getUserInfo() {
    super.getUserInfo();
    console.log(`${this.user.name} puede revisar articulos.`)
  }

  addReview(review) {
    this.reviews.push(review)
  }

  hasMaxRequest(numRequest) {
    return this.reviewRequests.length >= numRequest;
  }

  updateBid(publication, interestLevel) {
    const existingBid = this.bids.find(bid => bid.publication === publication);

    if (!existingBid) {
      throw new Error(`No se ha enviado un bid a la publicacion "${publication.title}".`);
    }
    existingBid.interestLevel = interestLevel;
    console.log(`Bid actualizado.`);
  }
}

module.exports = ReviewerRole;