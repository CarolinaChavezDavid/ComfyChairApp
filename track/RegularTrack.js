const Track = require("./Track");
const Regular = require('../publication/Regular')


class RegularTrack extends Track {

    getType() {
        return 'regular';
    }

    getTrackInfo() {
       return `${super.getTrackInfo()}, Tipo: ${this.getType()}`;
    }

    submitArticle(article) {
        if (!(article instanceof Regular)) {
            throw new Error(`El tipo de la publicación es incorrecto. Esperado: regular, Enviado: ${article.getType()}`);
        }
        super.submitArticle(article);
    }

}

module.exports = RegularTrack;