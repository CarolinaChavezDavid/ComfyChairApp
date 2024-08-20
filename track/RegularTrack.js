const Track = require("./Track");

class RegularTrack extends Track {

    getType() {
        return 'regular';
    }

    isPublicationAvailableType(publicationType) {
        return (publicationType === 'regular')
    }
}

module.exports = RegularTrack;  