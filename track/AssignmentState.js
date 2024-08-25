const Review = require("../publication/Review");
const User = require("../user/User");
const Constants = require("../utils/Constants");
const TrackState = require("./TrackState");

class AssigmentState extends TrackState {

    constructor(track) {
        super(track)
        this.track = track

    }

    init() {
        this.track.publications.forEach(publication => {
            this.validateBids(publication)

        });
    }

    getTotalReviewsRequest() {
        return (this.track.publications.length * Constants.MAX_PUBLICATION_REVIEWS) / this.track.getReviewers()
    }

    validateBids(publication) {
        publication.bids.forEach(bid => {
            if (!publication.hasMaxReviwes){t
                this.validateInterestedLevel(bid)
            };
            
        });
    }

    validateInterestedLevel(bid) {
        if (!bid.reviewer.hasMaxRequest(this.getTotalReviewsRequest())) {
            if (bid.interestLevel === Constants.INTEREST_LEVEL.INTERESTED) {
                let review = new Review(0, bid.reviewer)
                publication.addReview(review)
                bid.reviewer.reviewRequests(review)
            }
        };
    }

    validateMaybeLevel(publication) {
        publication.bids.forEach(bid => {
            if (bid.interestLevel === Constants.INTEREST_LEVEL.MAYBE) {
                if (!publication.hasMaxReviwes) {
                    publication.addReview()

                }

            }

        });
    }

}

module.exports = AssigmentState;