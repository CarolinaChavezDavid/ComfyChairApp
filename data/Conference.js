const User = require('../track/Track');

class Conference {
    constructor(field){
        this.id = Math.floor(Math.random() * 1000000)
        this.field = field
        this.users = []
        this.tracks = []
    }

    createTrack(track){
         this.tracks.push(track)
    }

    registerUser(user){
        this.users.push(user)
    }

    getConferenceInfo(){
        console.log(`Conferencia: ${this.field}, ID ${this.id}, usuarios: ${this.users.length}, sesiones: ${this.tracks}`);
    }

    createTrack(type, topic, deadline, acceptanceMethod, user) {
        console.log(user.hasRole('chair'))
        if (!user.hasRole('chair')) {
            throw new Error('Solo los organizadores pueden crear sesiones.');
        }

        let track;
        switch (type) {
            case 'regular':
                track = new RegularTrack(topic, deadline, acceptanceMethod);
                break;
            case 'workshop':
                track = new WorkshopTrack(topic, deadline, acceptanceMethod);
                break;
            case 'poster':
                track = new PosterTrack(topic, deadline, acceptanceMethod);
                break;
            default:
                throw new Error('Tipo de sesión invalido.');
        }

        this.tracks.push(track);
    }
}

module.exports = Conference;