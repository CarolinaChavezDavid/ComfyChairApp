const UserRoleDecorator = require('./UserRoleDecorator'); 

class ChairRole extends UserRoleDecorator {
    constructor(user) {
      super(user);
      this.addRole('chair');
    }
  
    organizeConference(conference) {
      console.log(`${this.user.name} organized conference: ${conference}`);
    }
  
    getUserInfo() {
      super.getUserInfo();
      console.log(`${this.user.name} puede organizar conferencias.`);
    }
  }

  module.exports = ChairRole;