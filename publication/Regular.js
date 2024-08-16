const Publication = require("./Publication");

class Regular extends Publication {
    constructor(title, attachedFile, inChargedAuthor, sendDate, abstract) {
      super(title, attachedFile, inChargedAuthor, sendDate);
      this.abstract = abstract;
    }

    getType() {
        return 'regular';
    }
  }

  module.exports = Regular;
