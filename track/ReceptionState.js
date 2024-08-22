const TrackState = require("./TrackState");

class ReceptionState extends TrackState {

    constructor(track, deadline) {
        super(track)
        this.track = track
        this.deadline = deadline
        this.init()
    }

    init() {
        console.log(`La sesion "${this.track.topic}" se encuentra en el estado de recepcion de articulos.`);
        setTimeout(() => {
            this.track.setState(this.track.biddingState);
            this.track.removeRejectedPublications();
            console.log(`La sesion ${this.track.topic} ha pasado al estado de biddnig, los revisores podran enviar bids.`);
            console.log(`* Revisores: ${this.track.getReviewers().length} articulos:${this.track.publications.length}.`);
            this.track.notifyReviwers()
        }, this.deadline);
    }

    submitPulication(publication) {
        publication.updateState('inReview')
        if (this.isNullOrEmpty(publication.title)) {
            console.log(`La publicación ${publication.title} no tiene un titulo correcto.`)
            publication.updateState('rejected')
        }
        if (!publication.leadAuthor) {
            console.log(`La publicación ${publication.title} no tiene autor asignado.`)
            publication.updateState('rejected')
        }
        if (publication.getType() === 'regular') {
            if (this.isNullOrEmpty(publication.abstract)) {
                console.log(`La publicación ${publication.title} no tiene resumen`)
                publication.updateState('rejected')
            }
            if (this.countWords(publication.abstract) > 300) {
                console.log(`La publicación ${publication.title} tiene un resumen de mas de 300 palabras`)
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