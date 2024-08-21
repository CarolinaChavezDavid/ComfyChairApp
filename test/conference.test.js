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
        conference.registerUser(chairUser);
        conference.createTrack('regular', 'Software Engineering', '2024-12-31', 'best', chairUser);
        conference.createTrack('workshop', 'AI Innovations', '2024-11-30', 'best', chairUser);
        conference.createTrack('poster', 'Big Data', '2024-10-31', 'best', chairUser);

       const trackInfo = conference.getTracksInfo();

       expect(trackInfo).toHaveLength(3);
       expect(trackInfo[0]).toContain('Software Engineering');
       expect(trackInfo[1]).toContain('AI Innovations');
       expect(trackInfo[2]).toContain('Big Data');
       expect(trackInfo[0]).toContain('Tipo: regular');
       expect(trackInfo[1]).toContain('Tipo: workshop');
       expect(trackInfo[2]).toContain('Tipo: poster');

    });

    test('Un track regular debe aceptar solo artículos regulares', () => {
        const regularTrack =  TestDataFactory.createRegularTrack()
        const posterArticle =  TestDataFactory.createPosterPublicationExample1()

        expect(() => {
            regularTrack.submitArticle(posterArticle);
        }).toThrow('El tipo de la publicación es incorrecto. Esperado: regular, Enviado: poster');
    });

    test('Un track poster debe aceptar solo artículos poster', () => {
        const posterTrack =  TestDataFactory.createPosterTrack()
        const regularArticle = TestDataFactory.createRegularPublicationExample1()
        expect(() => {
            posterTrack.submitArticle(regularArticle);
        }).toThrow('El tipo de la publicación es incorrecto. Esperado: poster, Enviado: regular');
    });
});
