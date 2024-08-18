class Publication {
    constructor(title, attachedFile, leadAuthor) {
      this.title = title;
      this.attachedFile = attachedFile;
      this.authors = []
      this.leadAuthor = leadAuthor;
      this.state = 'inReview';
      this.sendDate = sendDate;
    }
      changeState(newState) {
      this.state = newState;
    }

    getType() {
        throw new Error("El método 'getType()' debe ser implementado.");
    }



  }

  module.exports = Publication;