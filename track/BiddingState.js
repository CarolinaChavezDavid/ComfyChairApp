const TrackState = require("./TrackState");

class BiddingState extends TrackState {

    constructor(track, deadline){
        super(track)
        this.deadline = deadline
        setTimeout(() => {
            track.setState(track.biddingState);
            console.log(`La sesion "${this.track.topic}" ha pasado al estado de Asignacion, los revisores podran revisar los articulos revisados.`);
        }, this.deadline);
    }

}

module.exports = BiddingState;