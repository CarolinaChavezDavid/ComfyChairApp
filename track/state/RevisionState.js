const Review = require("../../publication/Review");
const Constants = require("../../utils/Constants");
const TrackState = require("./TrackState");

class RevisionState extends TrackState {

    constructor(track) {
        super(track);
        this.track = track;
        this.interval = null;
    }

    init() {
        console.log(`Ha iniciado el proceso de revisión para la sesión "${this.track.topic}"`);
        this.startReviewCheck();
    }

    submitReview(publication, score, message, reviewer) {
        this.hasAlreadySendReview(publication, reviewer);
        if (!this.validateUser(publication, reviewer)) {
            throw new Error(`${reviewer.name} ${reviewer.lastName} no es un revisor válido para la publicación "${publication.title}"`);
        }

        if (!this.isValidateScore(score)) {
            throw new Error(`${reviewer.name} ${reviewer.lastName} no envió un score válido para la publicación "${publication.title}"`);
        }

        if (this.isNullOrEmpty(message)) {
            throw new Error(`${reviewer.name} ${reviewer.lastName} no envió un mensaje válido para la publicación "${publication.title}"`);
        }

        let review = new Review(score, message, reviewer);
        publication.submitReview(review);
    }

    finalizeReviews() {
        let allReviewsComplete = true;
        this.track.publications.forEach(pub => {
            pub.reviewers.forEach(reviewer => {
                const review = pub.reviews.find(rev => rev.reviewer === reviewer);
                if (!review) {
                    console.error(`El revisor ${reviewer.name} no ha revisado la publicación "${pub.title}"`);
                    allReviewsComplete = false;
                }
            });
        });

        if (allReviewsComplete) {
            console.log("Todas las revisiones se han completado");
            clearInterval(this.interval); // Limpia el intervalo cuando las revisiones están completas
            this.track.setState(this.track.selectionState);
        } else {
            console.log("Notificando revisiones faltantes");
        }
    }

    hasAlreadySendReview(publication, reviewer) {
        const existingRev = publication.reviews.find(review => review.reviewer === reviewer);
        if (existingRev) {
            throw new Error(`El revisor ${reviewer.name} ${reviewer.lastName} ya envió una revisión a la publicación "${publication.title}".`);
        }
    }

    validateUser(publication, reviewer) {
        return publication.reviewers.includes(reviewer);
    }

    isValidateScore(score) {
        return score >= -3 && score <= 3;
    }

    isNullOrEmpty(text) {
        return text === null || text === undefined || text.trim().length === 0;
    }

    startReviewCheck() {
        this.interval = setInterval(() => {
            this.finalizeReviews();
        }, 10000);
    }

    // Método para limpiar el intervalo
    cleanup() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

module.exports = RevisionState;
