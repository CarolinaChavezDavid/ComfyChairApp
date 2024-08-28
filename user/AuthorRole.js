const Constants = require('../utils/Constants');
const UserRoleDecorator = require('./UserRoleDecorator'); 

class AuthorRole extends UserRoleDecorator {
    constructor(user) {
      super(user);
      this.addRole(Constants.USER_ROLE.AUTHOR);
    }

    getUserInfo() {
      super.getUserInfo();
      console.log(`${this.user.name} puede enviar articulos.`);
    }
  }
  
  module.exports = AuthorRole;