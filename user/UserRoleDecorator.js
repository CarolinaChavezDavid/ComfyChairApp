class UserRoleDecorator {
    constructor(user) {
      this.user = user;
    }
  
    addRole(role) {
      this.user.addRole(role);
    }
  
    removeRole(role) {
      this.user.removeRole(role);
    }
  
    getRoles() {
      return this.user.getRoles();
    }
  
    getUserInfo() {
      return this.user.getUserInfo();
    }
  }

  module.exports = UserRoleDecorator;
  