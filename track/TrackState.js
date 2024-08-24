class TrackState{

    constructor(track) {
        this.track = track;
    }

    init() {
        throw new Error('Este metodo debe ser implementado');
    }
    submitPulication(publication) {
        throw new Error('Este metodo debe ser implementado');
    }

    submitBid(publication, interestLevel, reviewer) {
        throw new Error('Este metodo debe ser implementado');
    }
    
    startReview(track) {
        throw new Error('Este metodo debe ser implementado');
    }

    finalizeSelection(track) {
        throw new Error('Este metodo debe ser implementadon');
    }
}

module.exports = TrackState;