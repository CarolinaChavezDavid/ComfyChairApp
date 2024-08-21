const User = require('../user/User');
const Conference = require('../Conference');
const RegularTrack = require('../track/RegularTrack');
const WorkshopTrack = require('../track/WorkshopTrack');
const PosterTrack = require('../track/PosterTrack');
const Publication = require('../publication/Publication');
const Regular = require('../publication/Regular');
const Poster = require('../publication/Poster');


class TestDataFactory {

    static createUserCarolina() {
        const user = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP');
        user.addRole('author'); 
        return user
    }

    static createUserFer() {
        const user = new User('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456','UNLP');
        user.addRole('author'); 
        return user
    }

    static createUserFerChair() {
        const user = new User('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456','UNLP');
        user.addRole('chair');  
        return user

    }

    static createConference() {
        return new Conference('Tecnología'); // Aquí puedes cambiar el field si necesitas otro valor en español
    }

    static createRegularTrack(user) {
        return new RegularTrack('Ingeniería de Software', '2024-12-31', 'mejor', user);
    }

    static createWorkshopTrack(user) {
        return new WorkshopTrack('Innovaciones en IA', '2024-11-30', 'mejor', user);
    }

    static createPosterTrack(user) {
        return new PosterTrack('Big Data', '2024-10-31', 'mejor, user');
    }

    static createPublicationExample1() {
        return new Publication('Título de ejemplo', 'archivo.pdf', 'Fernando Corinaldesi');
    }
    static createRegularPublicationExample1() {
        return new Regular('AI Basics', 'http://file.url', 'Author1', '2024-08-20', 'An abstract');
    }
    static createPosterPublicationExample1() {
        return new Poster('Big Data Insights', 'http://file.url', 'Author2', '2024-08-20', 'http://sources.url');
    }
}
                
module.exports = TestDataFactory;
