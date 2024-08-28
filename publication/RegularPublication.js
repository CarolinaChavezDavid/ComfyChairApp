const Constants = require("../utils/Constants");
const Publication = require("./Publication");

class RegularPublication extends Publication {
    constructor(title, attachedFile, leadAuthor, abstract) {
      super(title, attachedFile, leadAuthor);
      this.abstract = abstract;
    }

    getType() {
        return Constants.PUBLICATION_TYPE.REGULAR;
    }
  }

  module.exports = RegularPublication;
