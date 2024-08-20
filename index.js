const Conference = require('./Conference');
const PosterPublication = require('./publication/PosterPublication');
const Poster = require('./publication/PosterPublication');
const RegularPublication = require('./publication/RegularPublication');
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
AIconference.createTrack("regular", "Machine learning", 3000, 3000, caro)
AIconference.getConferenceInfo()
AIconference.getTracksInfo()


const posterAIPublication = new PosterPublication('IA en la salud', 'www.somewhere.com', caro)
const regularAIPublication = new RegularPublication('La etica en la IA', 'www.somewhere.com', caro, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.')
posterAIPublication.getPublicationInfo()

AIconference.submitPublicationToTrack('Machine learning', regularAIPublication, caro)

AIconference.getTracksInfo()
regularAIPublication.getPublicationInfo()



