const Constants = require("../../utils/Constants");
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

        this.track.getReviewers().forEach(reviewer => {
            console.log(`** ${reviewer.name} ${reviewer.lastName} podra revisar las publicaciones  ${reviewer.reviewRequests.map(pub => pub.title).join(', ')}`)
        });
        console.log(`Ha finalizado el proceso de asinagción para la sesión "${this.track.topic}"`);

        this.track.setState(this.track.revisionState);
    }

    getTotalReviewsRequest() {
        return (this.track.publications.length * Constants.MAX_PUBLICATION_REVIEWS) / this.track.getReviewers().length
    }


    validateBids(publication) {
        let interestedReviewers = [];
        let maybeInterestedReviewers = [];
        let notInterestedReviwers = [];
        publication.bids.forEach(bid => {
            if (bid.interestLevel === Constants.INTEREST_LEVEL.INTERESTED) {
                interestedReviewers.push(bid.reviewer);
            } else if (bid.interestLevel === Constants.INTEREST_LEVEL.MAYBE) {
                maybeInterestedReviewers.push(bid.reviewer);
            } else if (bid.interestLevel == Constants.INTEREST_LEVEL.MAYBE) {
                notInterestedReviwers.push(bid.reviewer);
            }

        });

        this.assignToReviewers(publication, interestedReviewers)

        if (!publication.hasMaxReviewes()) {
            this.assignToReviewers(publication, maybeInterestedReviewers)
        }

        if (!publication.hasMaxReviewes()) {
            this.AssignRandomlyToReviwers(publication, notInterestedReviwers)
        }
    }

    assignToReviewers(publication, reviewers) {
        while (!publication.hasMaxReviewes() && reviewers.length > 0) {
            let reviewer = reviewers.shift();
            if (!reviewer.hasMaxRequest(this.getTotalReviewsRequest())) {
                publication.reviewers.push(reviewer);
                reviewer.reviewRequests.push(publication);
            }
        }
    }

    AssignRandomlyToReviwers(publication, reviewers) {
        let totalRevieweres = this.track.getReviewers()
        let notInterestedReviewers = totalRevieweres.filter(element => !reviewers.includes(element));
        let availableReviewers = notInterestedReviewers.filter(element => !publication.reviewers.includes(element))

        while (!publication.hasMaxReviewes() && availableReviewers.length > 0) {
            let reviewer = availableReviewers.shift();
            if (!reviewer.hasMaxRequest(this.getTotalReviewsRequest())) {
                publication.reviewers.push(reviewer);
                reviewer.reviewRequests.push(publication);
            }
        }
    }
}

module.exports = AssigmentState;