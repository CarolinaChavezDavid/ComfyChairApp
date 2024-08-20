const Conference = require('./Conference');
const PosterTrack = require('./track/PosterTrack');
const AuthorRole = require('./user/AuthorRole');
const ChairRole = require('./user/ChairRole');
const ReviewerRole = require('./user/ReviewerRole');
const User = require('./user/User');


let caro = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP');
let AIconference = new Conference('Artifitial Intelligence');
caro = new ReviewerRole(caro)
caro = new ChairRole(caro)

caro.getUserInfo()


AIconference.registerUser(caro)
AIconference.createTrack("regular", "Machine learning", "26/12/2024", "x", caro)
AIconference.getConferenceInfo()
AIconference.getTracksInfo()
