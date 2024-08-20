const TestDataFactory = require('./testDataFactory');

describe('Conference', () => {
    let conference;
    let chairUser;

    beforeEach(() => {
        chairUser = TestDataFactory.createUserFerChair();
        conference = TestDataFactory.createConference()
    });

    test('Como el usuario es "chair", deberia poder crear tracks y agregarlos a la conferencia', () => {
        conference.createTrack('regular', 'Software Engineering', '2024-12-31', 'best', chairUser);
        conference.createTrack('workshop', 'AI Innovations', '2024-11-30', 'best', chairUser);
        conference.createTrack('poster', 'Big Data', '2024-10-31', 'best', chairUser);
        expect(conference.tracks).toHaveLength(3);
    });

    test('Deberia agregar un usuario a la conferencia', () => {
        conference.registerUser(chairUser);
        expect(conference.users).toContain(chairUser);
    });

    test('Deberia devolver informacion de los tracks', () => {
       // console.log = jest.fn(); // Mock console.log to test output

      conference.getTracksInfo()
    });
});
