class Constants {

    static get MAX_PUBLICATION_REVIEWS() {
        return 3;
    }

    static get INTEREST_LEVEL() {
        return {
            INTERESTED: "interested",
            MAYBE: "maybe",
            NOT_INTERESTED: "notInterested"
        };
    }

    static get PUBLICATION_TYPE() {
        return {
            POSTER: "poster",
            REGULAR: "regular",
        };
    }

    static get PUBLICATION_STATE() {
        return {
            DRAFT: "poster",
            IN_REVIEW: "inReview",
            SELECTED: "selected",
            REJECTED: "rejected"
        };
    }

    static get TRACK_TYPE() {
        return {
            POSTER: "poster",
            REGULAR: "regular",
            WORKSHOP: "workshop"
        };
    }

    static get USER_ROLE() {
        return {
            REVIEWER: "reviewer",
            CHAIR: "chair",
            AUTHOR: "author"
        };
    }



}

module.exports = Constants;