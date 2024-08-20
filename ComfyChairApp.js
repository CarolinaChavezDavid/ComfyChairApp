const User = require('./user/User');

class ComfyChairApp {
    constructor(){
        this.conferences = []
        this.users = []
    }

    userRegistration(name, lastName, email, password, role, membership) {
        const newUser = new User(name, lastName, email, password, role, membership)
            this.users.push(newUser)
    }

    createConference(){
        const newConference = newConference()
        this.conferences.push(newConference)
    }

}  

module.exports = ComfyChairApp;