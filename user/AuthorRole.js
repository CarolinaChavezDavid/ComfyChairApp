const UserRoleDecorator = require('./UserRoleDecorator'); 

class AuthorRole extends UserRoleDecorator {
    constructor(user) {
      super(user);
      this.addRole('author');
    }

    getUserInfo() {
      super.getUserInfo();
      console.log(`${this.user.name} puede enviar articulos.`);
    }
  }
  
  module.exports = AuthorRole;