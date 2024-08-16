const Track = require("./Track");

class RegularTrack extends Track {

    getType() {
        return 'regular';
    }
}

module.exports = RegularTrack;