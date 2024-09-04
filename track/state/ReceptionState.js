const Constants = require("../../utils/Constants");
const TrackState = require("./TrackState");

class ReceptionState extends TrackState {

    constructor(track, deadline) {
        super(track)
        this.track = track
        this.deadline = deadline
        this.timeoutId = null;  // Añadir una propiedad para el ID del temporizador

    }

    init() {
        console.log(`La sesion "${this.track.topic}" se encuentra en el estado de recepcion de articulos.`);
        this.timeoutId = setTimeout(() => {
            this.track.setState(this.track.biddingState);
            this.track.removeRejectedPublications();
            console.log(`La sesion ${this.track.topic} ha pasado al estado de biddnig, los revisores podran enviar bids.`);
            console.log(`* Revisores: ${this.track.getReviewers().length} articulos:${this.track.publications.length}.`);
            this.track.notifyReviwers();
        }, this.deadline);
    }
    
    // Añadir un método para limpiar el temporizador
    cleanup() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    submitPulication(publication, user) {
        publication.updateState(Constants.PUBLICATION_STATE.IN_REVIEW);
        if (this.isNullOrEmpty(publication.title)) {
            console.log(`La publicación ${publication.title} no tiene un titulo correcto.`)
            publication.updateState(Constants.PUBLICATION_STATE.REJECTED);
        }
        if (!publication.leadAuthor) {
            console.log(`La publicación ${publication.title} no tiene autor asignado.`)
            publication.updateState(Constants.PUBLICATION_STATE.REJECTED);
        }
        if (publication.getType() === 'regular') {
            if (this.isNullOrEmpty(publication.abstract)) {
                console.log(`La publicación ${publication.title} no tiene resumen`)
                publication.updateState(Constants.PUBLICATION_STATE.REJECTED);
            } else if (this.countWords(publication.abstract) > 300) {
                console.log(`La publicación ${publication.title} tiene un resumen de mas de 300 palabras`)
                publication.updateState(Constants.PUBLICATION_STATE.REJECTED);
            }
        }
        console.log(`La publicación "${publication.title}" fue enviada a revision por ${user.name} ${user.lastName} `)
    }

    countWords(text) {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        return words.length;
    }

    isNullOrEmpty(text) {
        return text === null || text === undefined || text.trim().length === 0;
    }

}

module.exports = ReceptionState;