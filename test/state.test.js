const ReceptionState = require('../track/state/ReceptionState');
const BiddingState = require('../track/state/BiddingState');
const Track = require('../track/model/Track');
const Publication = require('../publication/Publication');
const User = require('../user/User');
const BestPublicationsMethod = require('../track/selection/BestPublicationsMethod')
const RegularPublication = require('../publication/RegularPublication')
const Conference = require('../Conference')
const ChairRole = require('../user/ChairRole')
const Constants = require('../utils/Constants');
const AssignmentState = require('../track/state/AssignmentState');
const RevisionState = require('../track/state/RevisionState')
const ReviewerRole = require('../user/ReviewerRole');

jest.useFakeTimers();

describe('Track States general', () => {
  let track;
  let user;
  let publication;

  beforeEach(() => {
    track = new Track('Test Track', { getType: () => 'someMethod' });
    user = new User('John', 'Doe', 'john@example.com', 'password', 'UNLP');
    publication = new Publication('Test Publication', 'file.pdf', user);
  });

  test('ReceptionState deberia pasar BiddingState', () => {
    const receptionState = new ReceptionState(track, 1000);
    track.setState(receptionState);

    jest.advanceTimersByTime(1000);

    expect(track.currentState).toBeInstanceOf(BiddingState);
  });

  test('BiddingState deberia pasar a RevisionState', () => {
    const biddingState = new BiddingState(track, 1000);
    track.setState(biddingState);

    jest.advanceTimersByTime(1000);

    expect(track.currentState).toBeInstanceOf(RevisionState);
  });

  test('RevisionState should check for completion of reviews', () => {
    const revisionState = new RevisionState(track);
    track.setState(revisionState);

    // Mock the finalizeReviews method
    revisionState.finalizeReviews = jest.fn();

    jest.advanceTimersByTime(10000);

    expect(revisionState.finalizeReviews).toHaveBeenCalled();
  });

  afterEach(() => {
    // Limpieza de todos los temporizadores
    if (track.currentState && typeof track.currentState.cleanup === 'function') {
      track.currentState.cleanup();
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

describe('RevisionState', () => {
  let conference;
  let track;
  let revisionState;
  let publication;
  let reviewer;
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

      // Crear el estado de revisión
      revisionState = new RevisionState(track);

      // Crear una publicación regular
      publication = new RegularPublication(
          'Impact of AI on Ethics',
          'www.somewhere.com',
          chairUser,
          'A detailed study on the ethical implications of AI.'
      );

      // Crear un revisor y asignar el rol
      let reviewerUser = new User('John', 'Doe', 'john.doe@gmail.com', 'password', 'UNLP');
      reviewer = new ReviewerRole(reviewerUser);

      publication.reviewers[0] = reviewer

      // Registrar el revisor en la conferencia y añadirlo a la publicación
      conference.registerUser(reviewer);

      // Enviar la publicación al track
      track.submitPublication(publication, chairUser);

      // Establecer el estado de revisión para el track
      track.setState(revisionState);
  });

  test('Debería permitir enviar una revisión válida', () => {
      const score = 2;
      const message = 'Good work on the ethics implications.';

      revisionState.submitReview(publication, score, message, reviewer);

      expect(publication.reviews).toHaveLength(1);
      expect(publication.reviews[0].reviewer).toBe(reviewer);
      expect(publication.reviews[0].score).toBe(score);
      expect(publication.reviews[0].message).toBe(message);
  });

  test('Debería lanzar un error si un revisor ya envió una revisión', () => {
      const score = 2;
      const message = 'Good work on the ethics implications.';

      revisionState.submitReview(publication, score, message, reviewer);

      expect(() => {
          revisionState.submitReview(publication, score, message, reviewer);
      }).toThrowError(`${reviewer.name} ${reviewer.lastName} ya envió una revisión a la publicación "${publication.title}".`);
  });

  test('Debería lanzar un error si el revisor no es válido para la publicación', () => {
      let otherUser = new User('Jane', 'Doe', 'jane.doe@gmail.com', 'password', 'UNLP');
      let otherReviewer = new ReviewerRole(otherUser);

      conference.registerUser(otherReviewer);

      expect(() => {
          revisionState.submitReview(publication, 2, 'Interesting study.', otherReviewer);
      }).toThrowError(`${otherReviewer.name} ${otherReviewer.lastName} no es un revisor válido para la publicación "${publication.title}"`);
  });

  test('Debería lanzar un error si el score de la revisión no es válido', () => {
      expect(() => {
          revisionState.submitReview(publication, 5, 'Invalid score.', reviewer);
      }).toThrowError(`${reviewer.name} ${reviewer.lastName} no envió un score válido para la publicación "${publication.title}"`);
  });

  test('Debería lanzar un error si el mensaje de la revisión está vacío', () => {
      expect(() => {
          revisionState.submitReview(publication, 2, '', reviewer);
      }).toThrowError(`${reviewer.name} ${reviewer.lastName} no envió un mensaje válido para la publicación "${publication.title}"`);
  });

  test('Debería finalizar correctamente las revisiones cuando todos los revisores han completado su tarea', () => {
      const score = 2;
      const message = 'Well-written and informative.';

      revisionState.submitReview(publication, score, message, reviewer);
      revisionState.finalizeReviews();

      expect(track.currentState).toBe(track.selectionState);
      expect(revisionState.interval).toBeNull();
  });

  test('Debería notificar revisiones faltantes si no se han completado todas las revisiones', () => {
      console.log = jest.fn(); // Mock console.log

      revisionState.finalizeReviews();

      expect(console.log).toHaveBeenCalledWith('Notificando revisiones faltantes');
  });

  afterEach(() => {
      revisionState.cleanup();
  });
});