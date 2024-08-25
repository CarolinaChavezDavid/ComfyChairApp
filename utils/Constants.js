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

}

module.exports = Constants;