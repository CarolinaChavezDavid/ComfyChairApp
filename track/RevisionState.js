const Review = require("../publication/Review");
const Constants = require("../utils/Constants");
const TrackState = require("./TrackState");

class RevisionState extends TrackState {

    constructor(track) {
        super(track)
        this.track = track;
        this.interval = null;
    }

    init() {
        console.log(`Ha iniciado el proceso de revisión para la sesión "${this.track.topic}"`);
        this.startReviewCheck()
    }

    submitReview(publication, score, message, reviewer) {
        if (this.validateUser(publication, reviewer) && this.isValidateScore(score) && !this.isNullOrEmpty(message)) {
            let review = new Review(score, message, reviewer)
            publication.submitReview(review)
        } else {
            throw new Error(`La revisión enviada por ${reviewer.name} ${reviewer.lastName} no son correcto para la publicación "${publication.title}"`)
        }
    }

    finalizeReviews() {
        let allReviewsComplete = true;
        this.track.publications.forEach(pub => {
            pub.reviewers.forEach(reviewer => {

                const review = pub.reviews.find(rev => rev.reviewer === reviewer);
                if (!review) {
                    console.error(`El revisor ${reviewer.name} no ha revisado la publicacón "${pub.title}"`);
                    allReviewsComplete = false;
                }
            });

        });

        if (allReviewsComplete) {
            console.log("Todas las revisiones se han completado");
            clearInterval(this.interval);
            this.track.setState(this.track.selectionState)
        } else {
            console.log("Notificando revisiones faltantes");
        }

    }

    validateUser(publication, reviewer) {
        return publication.reviewers.includes(reviewer)
    }

    isValidateScore(score) {
        return score >= -3 && score <= 3
    }

    isNullOrEmpty(text) {
        return text === null || text === undefined || text.trim().length === 0;
    }

    startReviewCheck() {
        this.interval = setInterval(() => {
            this.finalizeReviews();
        }, 10000);
    }
}

module.exports = RevisionState;