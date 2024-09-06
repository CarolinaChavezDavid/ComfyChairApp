const Conference = require('./Conference');
const PosterPublication = require('./publication/PosterPublication');
const Poster = require('./publication/PosterPublication');
const RegularPublication = require('./publication/RegularPublication');
const PosterTrack = require('./track/model/PosterTrack');
const BestPublicationsMethod = require('./track/selection/BestPublicationsMethod');
const FixSetMethod = require('./track/selection/FixSetMethod');
const AuthorRole = require('./user/AuthorRole');
const ChairRole = require('./user/ChairRole');
const ReviewerRole = require('./user/ReviewerRole');
const User = require('./user/User');


let caroUser = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP')
let ferUser = new User('Fernando', 'Corinaldesi', 'fernando@gmail.com', 'password123', 'UNLP')
let user1 = new User('Miguel', 'Rodríguez', 'miguel.rodriguez@gmail.com', 'password107', 'UNSAM')
let user2 = new User('Juan', 'González', 'juan.gonzalez@gmail.com', 'password456', 'UBA')
let user3 = new User('María', 'López', 'maria.lopez@gmail.com', 'password789', 'UTN')
let user4 = new User('Carlos', 'Pérez', 'carlos.perez@gmail.com', 'password101', 'UCA')
let user5 = new User('Ana', 'Martínez', 'ana.martinez@gmail.com', 'password102', 'UNSAM')
let user6 = new User('Luis', 'Fernández', 'luis.fernandez@gmail.com', 'password103', 'UNLP')
let user7 = new User('Laura', 'Sánchez', 'laura.sanchez@gmail.com', 'password104', 'UBA')
let user8 = new User('Diego', 'Gómez', 'diego.gomez@gmail.com', 'password105', 'UTN')
let user9 = new User('Sofía', 'Díaz', 'sofia.diaz@gmail.com', 'password106', 'UCA')

let AIconference = new Conference('Artifitial Intelligence')
caroUser = new ChairRole(caroUser)
caroUser = new ReviewerRole(caroUser)
user1 = new ReviewerRole(user1)
user2 = new ReviewerRole(user2)
user3 = new ReviewerRole(user3)
user4 = new ReviewerRole(user4)
user5 = new ReviewerRole(user5)

AIconference.registerUser(caroUser)
AIconference.registerUser(user1)
AIconference.registerUser(user2)
AIconference.registerUser(user3)
AIconference.registerUser(user4)
AIconference.registerUser(user5)
AIconference.registerUser(user6)
AIconference.registerUser(user7)
AIconference.registerUser(user8)
AIconference.registerUser(user9)

AIconference.getConferenceInfo()
let fixSetSelectionMethod = new FixSetMethod(0.5);
let bestPublicationsSelectionMethod = new BestPublicationsMethod(2);
let machineLearningTrack = AIconference.createTrack("regular", "Machine learning", fixSetSelectionMethod, caroUser)

const posterAIPublication = new PosterPublication('IA en la salud', 'www.somewhere.com', caroUser)
const regularAIPublication = new RegularPublication(
    'La etica en la IA',
    'www.somewhere.com',
    caroUser,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.'
)
const regularAIPublication1 = new RegularPublication(
    'Industria 4.0 y la AI',
    'www.somewhere.com',
    user6,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.'
);

const regularAIPublication2 = new RegularPublication(
    'Impacto de la IA en la sociedad',
    'www.somewhere.com',
    user7,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.'
);

const regularAIPublication3 = new RegularPublication(
    'Avances en el aprendizaje automático',
    'www.somewhere.com',
    user8,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.'
);

const regularAIPublication4 = new RegularPublication(
    'Desafíos éticos de la IA',
    'www.somewhere.com',
    user9,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc interdum ultricies libero non eleifend. Integer urna ipsum, tristique nec semper.'
);


const regularAIPublicationError = new RegularPublication(
    'IA en la contabilidad',
    'www.somewhere.com',
    user9,
    null
);
setTimeout(() => {
    machineLearningTrack.submitPublication(regularAIPublication1, user6)
    machineLearningTrack.submitPublication(regularAIPublication2, user7)
}, 2000);

setTimeout(() => {
    machineLearningTrack.submitPublication(regularAIPublication3, user8)
    machineLearningTrack.submitPublication(regularAIPublication4, user9)
}, 4000);

setTimeout(() => {
    machineLearningTrack.submitPublication(regularAIPublicationError, user9)
}, 6000);

machineLearningTrack.getTrackInfo()

setTimeout(() => {
    machineLearningTrack.submitBid(regularAIPublication1, 'maybe', caroUser)
    machineLearningTrack.submitBid(regularAIPublication2, 'interested', user1)
    machineLearningTrack.submitBid(regularAIPublication3, 'notInterested', user1)
}, 12000)

setTimeout(() => {
    machineLearningTrack.submitBid(regularAIPublication4, 'maybe', user2)
    machineLearningTrack.submitBid(regularAIPublication1, 'interested', user3)
    machineLearningTrack.submitBid(regularAIPublication, 'interested', caroUser)
}, 14000)

setTimeout(() => {
    machineLearningTrack.submitBid(regularAIPublication2, 'interested', user3)
    machineLearningTrack.submitBid(regularAIPublication3, 'interested', user3)
    machineLearningTrack.submitBid(regularAIPublication2, 'notInterested', user4)
    machineLearningTrack.submitBid(regularAIPublication3, 'maybe', user5)
    machineLearningTrack.getTrackInfo()
}, 16000)

setTimeout(() => {
    machineLearningTrack.submitReview(regularAIPublication1, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user3)
    machineLearningTrack.submitReview(regularAIPublication2, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user3)
    machineLearningTrack.submitReview(regularAIPublication3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user5)
}, 22000);

setTimeout(() => {
    machineLearningTrack.submitReview(regularAIPublication1, -3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', caroUser)
    machineLearningTrack.submitReview(regularAIPublication2, 3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', caroUser)
    machineLearningTrack.submitReview(regularAIPublication1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user1)
    machineLearningTrack.submitReview(regularAIPublication3, -3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user2)
    machineLearningTrack.submitReview(regularAIPublication3, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user4)
    machineLearningTrack.submitReview(regularAIPublication4, -3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user2)
    machineLearningTrack.submitReview(regularAIPublication4, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user4)
    machineLearningTrack.submitReview(regularAIPublication4, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user5)
}, 24000);

setTimeout(() => {
    machineLearningTrack.submitReview(regularAIPublication2, 2, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', user1)
}, 30000)
