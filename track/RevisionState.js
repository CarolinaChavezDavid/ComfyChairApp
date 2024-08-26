const Review = require("../publication/Review");
const Constants = require("../utils/Constants");
const TrackState = require("./TrackState");

class RevisionState extends TrackState {

    constructor(track) {
        super(track)
        this.track = track
    }

    init() {
        console.log(`Ha iniciado el proceso de revisión para la sesión "${this.track.topic}"`);
    }

    submitReview(publication, score, message, reviewer) {
        if (this.validateUser(publication, reviewer) && this.isValidateScore(score) && this.isNullOrEmpty(message)) {
            let review =  new Review(score, message, reviewer)
            publication.submitReview(review)
        } else {
            console.error('Los parametros de la revisión no son correcto')
        }

    }

    finalizeReviews(){
        let unfinishReviews = [];
        this.track.publications.forEach(pub => {
            pub.reviews < Constants.MAX_PUBLICATION_REVIEWS
            unfinishReviews.push(pub)
            
        });
        
        if (unfinishReviews.length > 0) {
           unfinishReviews.forEach( pub => {
            let reviewers = pub.reviewers
             if (this.track.publications.reviewers.includes(review.reviewer)) {
                
             }
            
           });
            console.error(`** ${reviewer.name} ${reviewer.lastName} podra revisar las publicaciones  ${reviewer.reviewRequests.map(pub => pub.title).join(', ')}`)
        }

        return unfinishReviews.length === 0;
    }

    getMissingReviews(){

    }

    validateUser(publication, reviewer){
        return publication.reviewers.includes(reviewer)
    }

    isValidateScore(score){
        return score >= -3 && score <= 3
    }

    isNullOrEmpty(text) {
        return text === null || text === undefined || text.trim().length === 0;
    }


}

module.exports = RevisionState;