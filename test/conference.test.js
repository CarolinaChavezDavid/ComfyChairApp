const TestDataFactory = require('./testDataFactory');

describe('Conference', () => {
    let conference;
    let chairUser;

    beforeEach(() => {
        chairUser = TestDataFactory.createUserFerChair();
        conference = TestDataFactory.createConference()
    });

    test('Como el usuario es "chair", deberia crear un track y agregarlo a la conferencia', () => {
        conference.createTrack('regular', 'Software Engineering', '2024-12-31', 'best', chairUser);
        expect(conference.tracks).toHaveLength(1);
    });

     test('Deberia agregar un usuario a la conferencia', () => {
         conference.registerUser(chairUser);
         expect(conference.users).toContain(chairUser);
     });
});
