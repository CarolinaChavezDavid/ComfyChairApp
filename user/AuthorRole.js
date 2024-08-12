const UserRoleDecorator = require('./UserRoleDecorator'); 

class AuthorRole extends UserRoleDecorator {
    constructor(user) {
      super(user);
      this.addRole('author');
    }
  
    submitArticle(article) {
      console.log(`${this.user.name} submitted article: ${article}`);
    }
  
    getUserInfo() {
      super.getUserInfo();
      console.log(`${this.user.name} puede enviar articulos.`);
    }
  }
  
  module.exports = AuthorRole;