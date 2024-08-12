const Conference = require('./data/Conference');
const AuthorRole = require('./user/AuthorRole');
const ReviewerRole = require('./user/ReviewerRole');
const User = require('./user/User');


let caro = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123');
let AIconference = new Conference('Artifitial Intelligence');
AIconference.getConferenceInfo()
caro = new ReviewerRole(caro)
caro.getUserInfo()