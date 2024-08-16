class Track {
    constructor(topic, deadline, acceptanceMethod, users) {
        this.topic = topic
        this.deadline = deadline;
        this.acceptanceMethod = acceptanceMethod;
        this.articles = [];
        this.users = users;
        this.state = 'reception';
      }
    
      submitArticle(article) {
        if (article.getType() !== this.getType()) {
          throw new Error(`El tipo de la publicación es incorrecto. Esperado: ${this.getType()}, Enviado: ${article.getType()}`);
      }
      this.articles.push(article);
      }

      getType() {
        throw new Error("El método 'getType()' debe ser implementado.");
      }

      submitPublication(publication) {
        throw new Error("El método 'submitPublication()' debe ser implementado.");
      }
}

module.exports = Track;