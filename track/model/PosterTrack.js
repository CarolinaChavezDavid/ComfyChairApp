const Constants = require("../../utils/Constants");
const Track = require("./Track");

class PosterTrack extends Track {

    getType() {
        return Constants.TRACK_TYPE.POSTER;
    }

    isPublicationAvailableType(publicationType) {
        return (publicationType === Constants.PUBLICATION_TYPE.REGULAR || publicationType === Constants.PUBLICATION_TYPE.POSTER)
    }

}

module.exports = PosterTrack;