const UserRoleDecorator = require('./UserRoleDecorator');

class ReviewerRole extends UserRoleDecorator {
  constructor(user) {
    super(user);
    super.addRole('reviewer')
    this.user = user
    this.bids = []
  }

  updateBidingState(publications){
    console.log(`El revisor ${this.user.name}, podra enviar bids a las siguientes publicaciones: ${publications.map(pub => pub.title).join(', ')}`);
  }

  reviewArticle(article) {
    console.log(`${this.user.name} reviewed article: ${article}`)
  }

  getUserInfo() {
    super.getUserInfo();
    console.log(`${this.user.name} puede revisar articulos.`)
  }

  submitBids(publication, interestLevel) {
    const bid = {
      article,
      interestLevel,
    }

    this.bids.push(bid)
  }
}

module.exports = ReviewerRole;