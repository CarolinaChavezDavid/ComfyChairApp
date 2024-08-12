class Article extends Publication {
    constructor(title, attachedFile, inChargedAuthor, sendDate, abstract) {
      super(title, attachedFile, inChargedAuthor, sendDate);
      this.abstract = abstract;
    }

  }

