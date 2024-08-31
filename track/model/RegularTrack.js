const Constants = require("../../utils/Constants");
const Track = require("./Track");

class RegularTrack extends Track {

    getType() {
        return Constants.TRACK_TYPE.REGULAR;
    }

    isPublicationAvailableType(publicationType) {
        return (publicationType === Constants.PUBLICATION_TYPE.REGULAR);
    }
}

module.exports = RegularTrack;  