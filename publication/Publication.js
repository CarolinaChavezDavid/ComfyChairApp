class Publication {
    constructor(title, attachedFile, leadAuthor) {
      this.title = title;
      this.attachedFile = attachedFile;
      this.authors = []
      this.leadAuthor = leadAuthor;
      this.state = 'draft';
      this.sendDate = new Date();
    }
      changeState(newState) {
      this.state = newState;
    }

  getType() {
    throw new Error("El método 'getType()' debe ser implementado.");
  }



  addAuthor(user){
    this.authors.push(user)
  }

  getPublicationInfo(){
    console.log(`Publicacion ${this.title}, estado: ${this.state}, tipo: ${this.getType()}`)
  }
}

module.exports = Publication;