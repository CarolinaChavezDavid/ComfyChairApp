const TestDataFactory = require('./testDataFactory');
const AuthorRole = require('../user/AuthorRole');
const BestPublicationsMethod = require('../track/selection/BestPublicationsMethod')
const RegularPublication =  require('../publication/RegularPublication')
const User =  require('../user/User')
const Conference =  require('../Conference')
const ChairRole =  require('../user/ChairRole')
describe('Conference', () => {
    let conference;
    let user;

    beforeEach(() => {
        user = TestDataFactory.createUser(); // Asegúrate de que createUser devuelva un nuevo usuario
        conference = TestDataFactory.createConference(); // Asegúrate de que createConference devuelva una nueva conferencia
        chairUser = TestDataFactory.createUserFerChair();
        selectionMethod = new BestPublicationsMethod(2);
        conference.registerUser(chairUser);
        track = conference.createTrack('regular', 'Machine Learning', selectionMethod, chairUser);

    });

    test('Debería actualizar un usuario a autor si no tiene ese rol', () => {
        const updatedUser = conference.updateUserAsAuthor(user);
        expect(updatedUser).toBeInstanceOf(AuthorRole);
    });

    test('No debería actualizar un usuario si ya tiene el rol de autor', () => {
        const authorUser = TestDataFactory.createUserFerAuthor()
        const updatedUser = conference.updateUserAsAuthor(authorUser);
        expect(updatedUser).toBeUndefined(); // Si ya es autor, no debería actualizarlo
    });

    test('Debería verificar si un usuario está registrado en la conferencia', () => {
        conference.registerUser(user);
        const isRegistered = conference.isUserRegistered(user);
        expect(isRegistered).toBe(true);
    });

    test('Debería agregar un usuario a la conferencia', () => {
        conference.registerUser(user);
        expect(conference.users).toContain(user);
    });

    test('Debería mostrar la información correcta de la conferencia', () => {
        console.log = jest.fn(); // Simula console.log
        conference.getConferenceInfo();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Conferencia:'));
    });

    test('Debería encontrar un track por su tema', () => {
        const foundTrack = conference.findTrack('Machine Learning');
        expect(foundTrack.topic).toBe('Machine Learning');
    });

    test('Debería devolver undefined si no encuentra el track', () => {
        const foundTrack = conference.findTrack('Track no existente');
        expect(foundTrack).toBeUndefined();
    });

    test('Debería lanzar un error si el usuario no tiene el rol de chair', () => {
        conference.registerUser(user);
        expect(() => conference.createTrack('regular', 'Machine Learning', selectionMethod, user))
            .toThrow('Solo los organizadores pueden crear sesiones.');
    });


    test('Debería agregar la publicación al track correcto', () => {

        let caroUser = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP')
        caroUser = new ChairRole(caroUser)
        let AIconference = new Conference('Artifitial Intelligence')
        AIconference.registerUser(caroUser)
        let machineLearningTrack = AIconference.createTrack("regular", "Machine learning", selectionMethod, caroUser)

        const regularAIPublication = new RegularPublication(
            'La etica en la IA',
            'www.somewhere.com',
            caroUser,
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.'
        )

        machineLearningTrack.submitPublication(regularAIPublication, caroUser)
        expect(machineLearningTrack.publications).toContain(regularAIPublication);

    });
});
