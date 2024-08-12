const Track = require("./Track");

class PosterTrack extends Track {

    getType() {
        return 'Poster';
    }

    submitPublication(publication) {
        throw new Error("El método 'submitPublication()' debe ser implementado.");
    }

}

module.exports = PosterTrack;