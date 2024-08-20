const Track = require("./Track");

class WorkshopTrack extends Track {

    getType() {
        return 'workshop';
    }
    
    isPublicationAvailableType(publicationType) {
        return (publicationType === 'poster')
    }

}

module.exports = WorkshopTrack;