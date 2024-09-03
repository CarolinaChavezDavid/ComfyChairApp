const dataFactory = require('./testDataFactory')
const Constants = require('../utils/Constants')

describe('User Class', () => {
    let user;

    beforeEach(() => {
        user = dataFactory.createUser();
    });

    test('Deberia agregar y quitar roles correctamente', () => {
        user.addRole('reviewer');
        expect(user.getRoles()).toContain('reviewer');

        user.removeRole('reviewer');
        expect(user.getRoles()).not.toContain('reviewer');
    });

    test('should check if user has a role', () => {
        user.addRole('chair');
        expect(user.hasRole('chair')).toBe(true);
        expect(user.hasRole('reviewer')).toBe(false);
    });

    test('Deberia mostrar la informacion del usuario cuando tiene un rol', () => {
        console.log = jest.fn();
        user.addRole('author');
        user.getUserInfo();
        expect(console.log).toHaveBeenCalledWith('Carolina Chavez tiene los roles: author');
    });

    test('Deberia mostrar la informacion del usuario cuando no tiene un rol', () => {
        console.log = jest.fn();
        user.getUserInfo();
        expect(console.log).toHaveBeenCalledWith('Carolina Chavez usuario registrado');
    });

    test('deberia agregar el rol author', () => {
        const author = dataFactory.createUserFerAuthor();
        expect(author.hasRole(Constants.USER_ROLE.AUTHOR)).toBe(true);
    });

    test('deberia agregar el rol chair', () => {
        const chair = dataFactory.createUserFerChair();
        expect(chair.hasRole(Constants.USER_ROLE.CHAIR)).toBe(true);
    });

    test('deberia agregar el rol revisor', () => {
        const reviewer = dataFactory.createUserFerReview();
        expect(reviewer.hasRole(Constants.USER_ROLE.REVIEWER)).toBe(true);
    });


});
