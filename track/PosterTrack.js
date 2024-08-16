const Track = require("./Track");

class PosterTrack extends Track {

    getType() {
        return 'poster';
    }
}

module.exports = PosterTrack;