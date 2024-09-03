const User = require('../user/User');
const Conference = require('../Conference');
const RegularTrack = require('../track/model/RegularTrack');
const WorkshopTrack = require('../track/model/WorkshopTrack');
const PosterTrack = require('../track/model/PosterTrack');
const Publication = require('../publication/Publication');
const Author = require('../user/AuthorRole')
const Chair = require('../user/ChairRole')
const Review = require('../user/ReviewerRole')
const RegularPublication = require('../publication/RegularPublication')


class TestDataFactory {

    static createUser() {
        const user = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP');
        return user
    }

    static createUserFerAuthor() {
        const user = new User('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456', 'UNLP');
        const authorUser = new Author(user)
        return authorUser
    }

    static createUserFerChair() {
        const user = new User('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456', 'UNLP');
        const chairUser = new Chair(user)
        return chairUser

    }

    static createUserFerReview() {
        const user = new User('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456', 'UNLP');
        const reviewUser = new Review(user)
        return reviewUser
    }

    static createConference() {
        return new Conference('Tecnología'); // Aquí puedes cambiar el field si necesitas otro valor en español
    }

    static createRegularTrack(user) {
        return new RegularTrack('Ingeniería de Software', '2024-12-31', 'mejor', user);
    }
}

module.exports = TestDataFactory;
