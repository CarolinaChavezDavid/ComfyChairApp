const Track = require("./Track");

class WorkshopTrack extends Track {

    getType() {
        return 'workshop';
    }

    submitArticle(article) {
        if (article.getType() == "poster" || article.getType() == "regular") {
            this.articles.push(article);

        } else {
            throw new Error(`El tipo de la publicación es incorrecto. Esperado: Poster o Regular, Enviado: ${article.getType()}`);
        }
    }

}

module.exports = RegularTrack;