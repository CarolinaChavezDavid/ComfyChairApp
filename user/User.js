class User {
  constructor(name, lastName, email, password, membership) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.membership = membership;
    this.roles = [];

    this.state = 'receptionState';
    this.reviewRequests = [];
  }

  updateBidingState(publications) {
    this.state = 'binddingState';
    console.log(`El revisor ${this.name}, podra enviar bids a las siguientes publicaciones: ${Array.from(publications).join(', ')}`);
  }

  addRole(role) {
    if (!this.roles.includes(role)) {
      this.roles.push(role);
    }
  }

  removeRole(role) {
    this.roles = this.roles.filter(r => r !== role);  // Corregido para funcionar con array
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
    if (this.roles && this.roles.length > 0) {  // Cambiado size a length para array
      console.log(`${this.name} ${this.lastName} tiene los roles: ${this.getRoles().join(', ')}`);
    } else {
      console.log(`${this.name} ${this.lastName} usuario registrado`);
    }
  }
}

module.exports = User;
