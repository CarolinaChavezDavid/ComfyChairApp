const Track = require("./Track");

class RegularTrack extends Track {

    getType() {
        return 'Regular';
    }
}

module.exports = RegularTrack;