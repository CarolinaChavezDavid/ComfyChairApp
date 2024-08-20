const ComfyChairApp = require('../ComfyChairApp');
const TestDataFactory = require('./testDataFactory');


describe('ComfyChairApp', () => {
    let app;
    let user;

    beforeEach(() => {
        app = new ComfyChairApp();
        user = TestDataFactory.createUserFer()
    });

    test('should register a user', () => {
        app.userRegistration('Fernando', 'Corinaldesi', 'corinaldesifernando@gmail.com', 'fer123456', 'author', 'UNLP');
        expect(app.users).toHaveLength(1);
        expect(app.users[0].email).toEqual('corinaldesifernando@gmail.com');
    });

    test('should create a conference and add it to the app', () => {
        app.createConference('Ingeniria de Software');
        expect(app.conferences).toHaveLength(1);
    });
});
