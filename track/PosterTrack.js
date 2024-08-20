const Track = require("./Track");

class PosterTrack extends Track {

    getType() {
        return 'poster';
    }
    
    getTrackInfo() {
        super.getTrackInfo()
        console.log(`Tipo: ${this.getType()}`)
    }

}

module.exports = PosterTrack;