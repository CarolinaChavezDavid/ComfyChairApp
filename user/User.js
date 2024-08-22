class User {
  constructor(name, lastName, email, password, membership) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.membership = membership
    this.roles = new Set();

  }


  updateBidingState(publications){
    console.log(`El revisor ${this.user.name}, podra enviar bids a las siguientes publicaciones: ${Array.from(publications).join(', ')}`)
  }


  addRole(role) {
    this.roles.add(role);
  }

  removeRole(role) {
    this.roles.delete(role);
  }

  getRoles() {
    return Array.from(this.roles);
  }

  hasRole(role) {
    return this.roles.has(role);
  }

  getUserInfo() {
    if (this.roles && this.roles.size > 0) {
      console.log(`${this.name} ${this.lastName} tiene los roles: ${Array.from(this.roles).join(', ')}`);
    } else {
      console.log(`${this.name} ${this.lastName} usuario registrado`);
    }
  }


}

module.exports = User;