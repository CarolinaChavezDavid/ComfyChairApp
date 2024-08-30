const TrackState = require("./TrackState");

class BiddingState extends TrackState {

    constructor(track, deadline) {
        super(track)
        this.deadline = deadline
        this.track = track
    }

    init() {
        setTimeout(() => {
            console.log(`La sesion "${this.track.topic}" ha pasado al estado de Asignacion.`);
            this.track.setState(this.track.assigmentState)
        }, this.deadline);
    }

    submitBid(publication, interestLevel, reviewer) {
        const existingBid = publication.bids.find(bid => bid.reviewer === reviewer);

        if (existingBid) {
            throw new Error(`El revisor ${reviewer.name} ya envio un bid para la publicacion "${publication.title}". Por favor actualice su bid.`);

        }
        const bid = {
            interestLevel,
            reviewer
        }

        publication.bids.push(bid)
        console.log(`Bid enviado para la publicacion "${publication.title}" por el revisor ${reviewer.name}.`);

    }
}

module.exports = BiddingState;