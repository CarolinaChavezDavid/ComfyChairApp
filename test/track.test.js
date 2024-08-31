const Track = require('../track/model/Track');
const ReceptionState = require('../track/state/ReceptionState');
const BiddingState = require('../track/state/BiddingState');
const RevisionState = require('../track/state/RevisionState');
const User = require('../user/User');
const ReviewUser = require('../user/ReviewerRole')
const RegularPublication = require('../publication/RegularPublication');
const Constants = require('../utils/Constants');

describe('Track', () => {
    let track;
    let user;
    let publication;

    beforeEach(() => {
        track = new Track('Machine Learning', { getType: () => 'someMethod' });
        user = new User('Fer', 'C', 'fer@example.com', 'password', 'membership');
        publication = new RegularPublication('Title', 'file.pdf', user, 'Abstract');
    });

    test('Debe inicializarse en el estado ReceptionState', () => {
        expect(track.currentState).toBeInstanceOf(ReceptionState);
    });

    test('Debe registrar un usuario correctamente', () => {
        track.registerUser(user);
        expect(track.users).toContain(user);
    });

    test('Debe lanzar error si se envía una publicación cuando el usuario no está registrado', () => {
        expect(() => track.submitPublication(publication, user)).toThrowError('El usuario Fer  no esta registrado en la conferencia.');
    });

    test('Debe lanzar error si se envía un bid cuando el usuario no es revisor', () => {
        track.registerUser(user);
        expect(() => track.submitBid(publication, Constants.INTEREST_LEVEL.INTERESTED, user)).toThrowError('El usuario Fer no tiene el rol de revisor.');
    });

   
    test('Debe lanzar error si se envía una revisión cuando el usuario no está registrado', () => {
        track.setState(new RevisionState(track));
        expect(() => track.submitReview(publication, 3, 'Good review', user)).toThrowError('El usuario Fer  no esta registrado en la conferencia.');
    });

    test('Debe lanzar error si se envía una revisión fuera del estado RevisionState', () => {
        track.setState(new ReceptionState(track, 3000)); // Cambia el estado
        const userRev = new ReviewUser(user)
        track.registerUser(userRev);
        expect(() => track.submitReview(publication, 3, 'Good review', userRev)).toThrowError('Solo se puede enviar revisiones en la etapa de revisión.');
    });

    test('Debe lanzar error si se envía una publicación fuera del estado ReceptionState', () => {
          const userRev = new ReviewUser(user)
          track.registerUser(userRev);
          track.setState(new BiddingState(track, 3000)); // Cambia el estado
         expect(() => track.submitPublication(publication, userRev)).toThrowError('Solo se puede enviar publicacion en la etapa de recepcion.');
     });
 
 
     test('Debe lanzar error si se envía un bid fuera del estado BiddingState', () => {
        const userRev = new ReviewUser(user)
        track.registerUser(userRev);
         track.setState(new ReceptionState(track, 3000)); // Cambia el estado
         expect(() => track.submitBid(publication, Constants.INTEREST_LEVEL.INTERESTED, userRev)).toThrowError('Solo se puede enviar bids en la etapa de bidding.');
     });

     test('Debe lanzar error si un usuario no registrado envía un bid', () => {
        const userRev = new ReviewUser(user)
         track.setState(new ReceptionState(track, 3000)); // Cambia el estado
         expect(() => track.submitBid(publication, Constants.INTEREST_LEVEL.INTERESTED, userRev)).toThrowError('El usuario Fer  no esta registrado en la conferencia.');
     });
 
});
