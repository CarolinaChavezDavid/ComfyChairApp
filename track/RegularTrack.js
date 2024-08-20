const Track = require("./Track");

class RegularTrack extends Track {

    getType() {
        return 'regular';
    }

    getTrackInfo() {
        super.getTrackInfo()
        console.log(`Tipo: ${this.getType()}`)
    }

}

module.exports = RegularTrack;