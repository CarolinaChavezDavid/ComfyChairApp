const User = require("./User");

class UserRoleDecorator extends User{
    constructor(user) {
      super(user.name, user.lastName, user.email, user.password, user.membership)
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

    hasRole(role) {
        return this.user.hasRole(role);
    }
  
    getUserInfo() {
      return this.user.getUserInfo();
    }
  }

  module.exports = UserRoleDecorator;
  