const UserRoleDecorator = require('./UserRoleDecorator'); 

class ReviewerRole extends UserRoleDecorator {
    constructor(user) {
      super(user);
      this.addRole('reviewer');
    }
  
    reviewArticle(article) {
      console.log(`${this.user.name} reviewed article: ${article}`);
    }
  
    getUserInfo() {
      super.getUserInfo();
      console.log(`${this.user.name} puede revisar articulos.`);
    }
  }

  module.exports = ReviewerRole;