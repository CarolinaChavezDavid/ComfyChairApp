const User = require('../user/User');
const Conference = require('../Conference');
const RegularTrack = require('../track/RegularTrack');
const WorkshopTrack = require('../track/WorkshopTrack');
const PosterTrack = require('../track/PosterTrack');
class TestDataFactory {

    static createUserCarolina() {
        return new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP');
    }

    static createUserFer() {
        return new User('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456', 'author', 'UNLP');
    }

    static createConference() {
        return new Conference('Tecnología'); // Aquí puedes cambiar el field si necesitas otro valor en español
    }

    static createRegularTrack() {
        return new RegularTrack('Ingeniería de Software', '2024-12-31', 'mejor');
    }

    static createWorkshopTrack() {
        return new WorkshopTrack('Innovaciones en IA', '2024-11-30', 'mejor');
    }

    static createPosterTrack() {
        return new PosterTrack('Big Data', '2024-10-31', 'mejor');
    }
}

module.exports = TestDataFactory;
