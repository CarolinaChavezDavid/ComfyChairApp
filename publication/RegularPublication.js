const Publication = require("./Publication");

class RegularPublication extends Publication {
    constructor(title, attachedFile, leadAuthor, abstract) {
      super(title, attachedFile, leadAuthor);
      this.abstract = abstract;
    }

    getType() {
        return 'regular';
    }
  }

  module.exports = RegularPublication;
