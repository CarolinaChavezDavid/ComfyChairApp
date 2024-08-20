const Track = require("./Track");

class PosterTrack extends Track {

    getType() {
        return 'poster';
    }

    isPublicationAvailableType(publicationType) {
        return (publicationType === 'regular' || publicationType === 'poster')
    }

}

module.exports = PosterTrack;