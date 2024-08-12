const Track = require("./Track");

class WorkshopTrack extends Track {

    getType() {
        return 'Workshop';
    }

}

module.exports = RegularTrack;