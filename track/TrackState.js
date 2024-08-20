class TrackState{
    submitPulication(publication) {
        throw new Error('Este metodo debe ser implementado');
    }
    
    startReview(track) {
        throw new Error('ste metodo debe ser implementado');
    }

    finalizeSelection(track) {
        throw new Error('Este metodo debe ser implementadon');
    }
}

module.exports = TrackState;