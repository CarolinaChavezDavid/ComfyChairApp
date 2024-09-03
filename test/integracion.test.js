const Conference = require('../Conference');
const PosterPublication = require('../publication/PosterPublication');
const RegularPublication = require('../publication/RegularPublication');
const FixSetMethod = require('../track/selection/FixSetMethod');
const BestPublicationsMethod = require('../track/selection/BestPublicationsMethod');
const User = require('../user/User');
const ChairRole = require('../user/ChairRole');
const ReviewerRole = require('../user/ReviewerRole');

describe('Conference Integration Test', () => {
    let conference;
    let users;
    let publications;
    let track;

    beforeEach(() => {
        // Configuración de los usuarios
        users = [
            new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP'),
            new User('Fernando', 'Corinaldesi', 'fernando@gmail.com', 'password123', 'UNLP'),
            new User('Miguel', 'Rodríguez', 'miguel.rodriguez@gmail.com', 'password107', 'UNSAM'),
        ];

        // Aplicar roles
        users[0] = new ChairRole(new ReviewerRole(users[0]));
        users.slice(2, 7).forEach(user => user = new ReviewerRole(user)); // Aplicar ReviewerRole a algunos usuarios

        // Crear la conferencia
        conference = new Conference('Artificial Intelligence');

        // Registrar usuarios
        users.forEach(user => conference.registerUser(user));

        // Crear y añadir un track
        const bestPublicationsMethod = new BestPublicationsMethod(2);
        track = conference.createTrack('regular', 'Machine learning', bestPublicationsMethod, users[0]);

        // Crear publicaciones
        publications = [
            new RegularPublication('La etica en la IA', 'www.somewhere.com', users[0], 'Content 1'),
            new RegularPublication('Industria 4.0 y la AI', 'www.somewhere.com', users[6], 'Content 2'),
        ];

        // Enviar publicaciones al track
        publications.forEach(pub => track.submitPublication(pub, pub.leadAuthor));
    });

   test('Debe gestionar correctamente las publicaciones y usuarios', done => {
        // Asegúrate de que todas las publicaciones hayan sido enviadas
        track.getTrackInfo()

        // Ejecutar el método de selección (simulado, no implementado en el código original)
     

        // Verificar el estado de las publicaciones después de la selección
        
    });
});
