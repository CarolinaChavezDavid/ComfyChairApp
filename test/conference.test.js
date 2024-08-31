const TestDataFactory = require('./testDataFactory');
const AuthorRole = require('../user/AuthorRole');

describe('Conference', () => {
    let conference;
    let user;

    beforeEach(() => {
        user = TestDataFactory.createUser(); // Asegúrate de que createUser devuelva un nuevo usuario
        conference = TestDataFactory.createConference(); // Asegúrate de que createConference devuelva una nueva conferencia
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
});
