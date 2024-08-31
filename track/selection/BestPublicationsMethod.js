const Constants = require("../../utils/Constants");
const SelectionMethodStrategy = require("./SelectionMethodStrategy");

class BestPublicationsMethod extends SelectionMethodStrategy {
    constructor(score) {
        super();
        this.score = score
    }

    getType() {
        return 'mejores publicaciones';
    }

    executeMethod(publications) {
        publications.forEach(pub => {
            pub.calculateFinalScore();
        });
        publications.sort((a, b) => b.finalScore - a.finalScore);

        publications.forEach(pub => {
            if (pub.finalScore >= this.score) {
                pub.state = Constants.PUBLICATION_STATE.SELECTED;
            } else {
                pub.state = Constants.PUBLICATION_STATE.REJECTED;
            }
        });

        publications.forEach(pub => {
            if (pub.state === Constants.PUBLICATION_STATE.SELECTED) {
                console.log(`* ${pub.title}`)
            }
        });
    }
}

module.exports = BestPublicationsMethod;