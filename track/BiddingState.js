const TrackState = require("./TrackState");

class BiddingState extends TrackState {

    constructor(track, deadline){
        super(track)
        this.deadline = deadline
        this.track = track
        this.init()

    }

    init(){
        setTimeout(() => {
            console.log(`La sesion "${this.track.topic}" ha pasado al estado de Asignacion, los revisores podran revisar los articulos revisados.`);
        }, this.deadline);
    }

}

module.exports = BiddingState;