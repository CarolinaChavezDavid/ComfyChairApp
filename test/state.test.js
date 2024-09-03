const ReceptionState = require('../track/state/ReceptionState');
const BiddingState = require('../track/state/BiddingState');
const AssignmentState = require('../track/state/AssignmentState');
const RevisionState = require('../track/state/RevisionState');
const SelectionState = require('../track/state/SelectionState');
const Track = require('../track/model/Track');
const Publication = require('../publication/Publication');
const User = require('../user/User');
const Constants = require('../utils/Constants');

jest.useFakeTimers();

describe('Track States', () => {
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