const TrackState = require("./TrackState");

class AssigmentState extends TrackState {

    constructor(track) {
        super(track)
        this.track = track

    }

    init(){

        this.track.publications.forEach(publication => {
            
        });
    }

}

module.exports = AssigmentState;