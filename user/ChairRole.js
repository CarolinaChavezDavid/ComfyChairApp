const Constants = require('../utils/Constants');
const UserRoleDecorator = require('./UserRoleDecorator'); 

class ChairRole extends UserRoleDecorator {
    constructor(user) {
      super(user);
      this.addRole(Constants.USER_ROLE.CHAIR);
    }
  
    getUserInfo() {
      super.getUserInfo();
      console.log(`${this.user.name} puede organizar conferencias.`);
    }
  }

  module.exports = ChairRole;