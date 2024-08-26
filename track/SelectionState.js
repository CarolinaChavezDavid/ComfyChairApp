const TrackState = require("./TrackState");

class SelectionState extends TrackState{
    constructor(track) {
        super(track)
        this.track = track
    }
}

module.exports = SelectionState;