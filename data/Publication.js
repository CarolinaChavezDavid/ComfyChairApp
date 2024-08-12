class Publication {
    constructor(title, attachedFile, inChargedAuthor, sendDate) {
      this.title = title;
      this.attachedFile = attachedFile;
      this.inChargedAuthor = inChargedAuthor;
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