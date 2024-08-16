const Publication = require("./Publication");

class Poster extends Publication {
    constructor(title, attachedFile, inChargedAuthor, sendDate, sources) {
      super(title, attachedFile, inChargedAuthor, sendDate);
      this.sources = sources;
    }

    getType() {
        return 'poster';
    }

  }
  module.exports = Poster;
