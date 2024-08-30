const Constants = require("../../utils/Constants");
const SelectionMethodStrategy = require("./SelectionMethodStrategy");

class FixSetMethod extends SelectionMethodStrategy {
    constructor(percentage) {
        super();
        this.percentage = percentage;
    }

    getType() {
        return 'corte fijo';
    }

    executeMethod(publications) {
        publications.forEach(pub => {
            pub.calculateFinalScore();
        });
        publications.sort((a, b) => b.finalScore - a.finalScore);

        let numberOfSelectedArticles = Math.round(publications.length * this.percentage);
        for (let i = 0; i < publications.length; i++) {
            if (i < numberOfSelectedArticles) {
                publications[i].state = Constants.PUBLICATION_STATE.SELECTED;
            } else {
                publications[i].state = Constants.PUBLICATION_STATE.REJECTED;
            }
        }

        publications.forEach(pub => {
            if (pub.state === Constants.PUBLICATION_STATE.SELECTED) {
                console.log(`* ${pub.title}`)
            }
        });
    }
}

module.exports = FixSetMethod;