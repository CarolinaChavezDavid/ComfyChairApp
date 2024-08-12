class Track {
    constructor(topic, deadline, acceptanceMethod, users) {
        this.topic = topic
        this.deadline = deadline;
        this.acceptanceMethod = acceptanceMethod;
        this.articles = [];
        this.users = users
        this.state = 'reception';
      }
    
      submitArticle(article) {
        if (this.state !== 'reception') {
          throw new Error("El tiempo de recepción de articulos ha terminado");
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