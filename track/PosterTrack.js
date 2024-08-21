const Track = require("./Track");
const Poster = require('../publication/Poster')

class PosterTrack extends Track {

    getType() {
        return 'poster';
    }

    getTrackInfo() {
        return `${super.getTrackInfo()}, Tipo: ${this.getType()}`;
    }

    submitArticle(article) {
        if (!(article instanceof Poster)) {
            throw new Error(`El tipo de la publicación es incorrecto. Esperado: poster, Enviado: ${article.getType()}`);
        }
        super.submitArticle(article);
    }

}

module.exports = PosterTrack;