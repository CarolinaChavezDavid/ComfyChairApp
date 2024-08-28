const Constants = require("../../utils/Constants");
const Track = require("./Track");

class WorkshopTrack extends Track {

    getType() {
        return Constants.TRACK_TYPE.WORKSHOP;
    }

    isPublicationAvailableType(publicationType) {
        return (publicationType === Constants.PUBLICATION_TYPE.POSTER);
    }

}

module.exports = WorkshopTrack;