const User = require('./user/User');
const Conference = require('./Conference')

class ComfyChairApp {
    constructor(){
        this.conferences = []
        this.users = []
    }

    userRegistration(name, lastName, email, password, role, membership) {
        const newUser = new User(name, lastName, email, password, role, membership)
            this.users.push(newUser)
    }

    createConference(field){
        const newConference = new Conference(field)
        this.conferences.push(newConference)
    }

}  

module.exports = ComfyChairApp;