const TrackState = require("./TrackState");

class SelectionState extends TrackState{
    constructor(track) {
        super(track)
        this.track = track
    }

    init() {
        console.log(`Ha iniciado el proceso de selección de publicaciones para la sesión "${this.track.topic}"`);
        this.selectPublications();
        this.track.finalizeTrack();
    }

    selectPublications(){
        console.log(`Las publicaciones seleccionadas por el método "${this.track.selectionMethod.getType()}" para la sesión "${this.track.topic} son":`)
        this.track.selectionMethod.executeMethod(this.track.publications);

    }
}

module.exports = SelectionState;