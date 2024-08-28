const Constants = require("../utils/Constants");
const Publication = require("./Publication");

class PosterPublication extends Publication {
    constructor(title, attachedFile, leadAuthor, sources) {
      super(title, attachedFile, leadAuthor);
      this.sources = sources;
    }

    getType() {
        return Constants.PUBLICATION_TYPE.POSTER;
    }

  }
  module.exports = PosterPublication;
