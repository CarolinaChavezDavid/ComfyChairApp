const UserRoleDecorator = require('./UserRoleDecorator');

class ReviewerRole extends UserRoleDecorator {
  constructor(user) {
    super(user);
    super.addRole('reviewer')
    this.bids = []
  }

  updateBidingState(publications){
    
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