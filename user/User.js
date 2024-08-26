class User {
  constructor(name, lastName, email, password, membership) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.membership = membership
    this.roles = [];

    this.state = 'receptionState'
    this.reviewRequests = []
  }

  updateBidingState(publications) {
    this.state = 'binddingState'
    console.log(`El revisor ${this.user.name}, podra enviar bids a las siguientes publicaciones: ${Array.from(publications).join(', ')}`)
  }

  addRole(role) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  removeRole(role) {
    this.roles.delete(role);
  }

  getRoles() {
    return Array.from(this.roles);
  }

  hasRole(role) {
    return this.roles.includes(role);
  }

  hasMaxRequest(numRequest) {
    return this.reviewRequests.length >= numRequest;
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