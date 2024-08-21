const Track = require("./Track");
const Poster = require('../publication/Poster')
const Regular = require('../publication/Regular')



class WorkshopTrack extends Track {

    getType() {
        return 'workshop';
    }

    getTrackInfo() {
        return `${super.getTrackInfo()}, Tipo: ${this.getType()}`;

    }

    submitArticle(article) {
        if (!(article instanceof Regular || article instanceof Poster)) {
            throw new Error(`El tipo de la publicación es incorrecto. Esperado: regular o poster, Enviado: ${article.getType()}`);
        }
        super.submitArticle(article);
    }

}

module.exports = WorkshopTrack;