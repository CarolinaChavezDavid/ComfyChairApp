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
    
    submitReview(publication, score, message, reviewer) {
        throw new Error('Este metodo debe ser implementado');
    }

    publicationsSelection(publications, selectionMethod) {
        throw new Error('Este metodo debe ser implementadon');
    }
}

module.exports = TrackState;