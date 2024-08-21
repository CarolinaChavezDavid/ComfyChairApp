const TrackState = require("./TrackState");

class ReceptionState extends TrackState {

    constructor(track, deadline){
        super(track)
        this.deadline = deadline
        setTimeout(() => {
            track.setState(track.biddingState);
            console.log(`La sesion "${this.track.topic}" ha pasado al estado de biddnig, los revisores podran enviar bids.`);
        }, this.deadline);
    }

    submitPulication(publication) {
        publication.updateState('inReview')
        if (this.isNullOrEmpty(publication.title)) {
            console.log('La publicación no tiene un titulo correcto')
            publication.updateState('rejected')
        }
        if(!publication.leadAuthor){
            console.log('La publicación no tiene un autor asignado')
            publication.updateState('rejected')
        }
        if (publication.getType() === 'regular') {
            if (this.isNullOrEmpty(publication.abstract)) {
                console.log('La publicación no tiene resumen')
                publication.updateState('rejected')
            }
            if (this.countWords(publication.abstract) > 300) {
                console.log('La publicación tiene un abastract de mas de 300 palabras')
                publication.updateState('rejected')
            }
        }
    }

    countWords(text) {
        return text.trim().split(/\s+/).length;
    }

    isNullOrEmpty(text) {
        return !text || text.trim().length === 0;
    }

}

module.exports = ReceptionState;