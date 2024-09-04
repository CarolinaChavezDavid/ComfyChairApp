const TestDataFactory = require('./testDataFactory');
const AuthorRole = require('../user/AuthorRole');
const BestPublicationsMethod = require('../track/selection/BestPublicationsMethod')
const RegularPublication = require('../publication/RegularPublication')
const User = require('../user/User')
const Conference = require('../Conference')
const ChairRole = require('../user/ChairRole')
const PosterPublication = require('../publication/PosterPublication');
const Constants = require('../utils/Constants');
const AssignmentState = require('../track/state/AssignmentState');
const ReviewerRole = require('../user/ReviewerRole');


const waitFor = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

    test('should correctly calculate total review requests', () => {
        const publication1 = new PosterPublication('Title1', 'www.somewhere.com', chairUser);
        const publication2 = new PosterPublication('Title2', 'www.somewhere.com', chairUser);
        const assignmentState = new AssignmentState(track);

  
        const expectedRequests = (track.publications.length * Constants.MAX_PUBLICATION_REVIEWS) / track.getReviewers().length;
        expect(assignmentState.getTotalReviewsRequest()).toBe(expectedRequests);
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

    test('Debería lanzar un error si el usuario no tiene el rol de chair', async () => {
        conference.registerUser(user);
        expect(() => conference.createTrack('regular', 'Machine Learning', selectionMethod, user))
            .toThrow('Solo los organizadores pueden crear sesiones.');
        await waitFor(3000);

    });


    test('Debería agregar la publicación al track correcto', async () => {

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
        machineLearningTrack.receptionState.cleanup();
        expect(machineLearningTrack.publications).toContain(regularAIPublication);

    });
    
    afterEach(() => {
        if (track.receptionState) {
            track.receptionState.cleanup();
        }
        if (track.biddingState) {
            track.biddingState.cleanup();
        }
    });
});

describe('AssignmentState', () => {
    let conference;
    let track;
    let assignmentState;
    let publication;
    let interestedReviewer;
    let maybeReviewer;
    let notInterestedReviewer;
    let chairUser;

    beforeEach(() => {
        // Crear la conferencia
        conference = new Conference('Artificial Intelligence Conference');

        // Crear un usuario chair y asignarle el rol
        let ferUser = new User('Fernando', 'Corinaldesi', 'fernando@gmail.com', 'password123', 'UNLP');
        chairUser = new ChairRole(ferUser);

        // Registrar el usuario chair en la conferencia
        conference.registerUser(chairUser);

        // Crear un método de selección y un track
        let selectionMethod = new BestPublicationsMethod(2);
        track = conference.createTrack('regular', 'Machine Learning', selectionMethod, chairUser);

        // Crear el estado de Assignment
        assignmentState = new AssignmentState(track);

        // Crear una publicación regular
        publication = new RegularPublication(
            'Impact of AI on Ethics',
            'www.somewhere.com',
            chairUser,
            'A detailed study on the ethical implications of AI.'
        );

        // Crear revisores interesados, tal vez interesados, y no interesados
        let interestedUser = new User('Interested', 'Reviewer', 'interested.reviewer@gmail.com', 'password', 'UNLP');
        let maybeUser = new User('Maybe', 'Reviewer', 'maybe.reviewer@gmail.com', 'password', 'UNLP');
        let notInterestedUser = new User('NotInterested', 'Reviewer', 'notinterested.reviewer@gmail.com', 'password', 'UNLP');

        interestedReviewer = new ReviewerRole(interestedUser);
        maybeReviewer = new ReviewerRole(maybeUser);
        notInterestedReviewer = new ReviewerRole(notInterestedUser);

        // Registrar los revisores en la conferencia
        conference.registerUser(interestedReviewer);
        conference.registerUser(maybeReviewer);
        conference.registerUser(notInterestedReviewer);

        // Añadir bids a la publicación
        publication.bids = [
            { reviewer: interestedReviewer, interestLevel: Constants.INTEREST_LEVEL.INTERESTED },
            { reviewer: maybeReviewer, interestLevel: Constants.INTEREST_LEVEL.MAYBE },
            { reviewer: notInterestedReviewer, interestLevel: Constants.INTEREST_LEVEL.NOT_INTERESTED },
        ];

        // Enviar la publicación al track
        track.submitPublication(publication, chairUser);
    });

    test('Debería asignar correctamente revisores interesados', () => {
        assignmentState.validateBids(publication);

        expect(publication.reviewers).toContain(interestedReviewer);
        expect(interestedReviewer.reviewRequests).toContain(publication);
    });

    test('Debería asignar revisores "tal vez" si no hay suficientes revisores interesados', () => {
        assignmentState.validateBids(publication);

        if (!publication.hasMaxReviewes()) {
            expect(publication.reviewers).toContain(maybeReviewer);
            expect(maybeReviewer.reviewRequests).toContain(publication);
        }
    });

    test('Debería asignar revisores aleatoriamente si no se alcanzó el máximo de revisores', () => {
        assignmentState.validateBids(publication);

        if (!publication.hasMaxReviewes()) {
            expect(publication.reviewers).toContain(notInterestedReviewer);
            expect(notInterestedReviewer.reviewRequests).toContain(publication);
        }
    });

    afterEach(() => {
        if (track.receptionState) {
            track.receptionState.cleanup();
        }
        if (track.biddingState) {
            track.biddingState.cleanup();
        }
    });
});
