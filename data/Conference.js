const User = require('../track/Track');

class Conference {
    constructor(field){
        this.id = Math.floor(Math.random() * 1000000)
        this.field = field
        this.users = []
        this.tracks = []
    }

    createTrack(topic, deadline, acceptanceMethod){
         const newTrack = Track(topic, deadline, acceptanceMethod)
         this.tracks.push(newTrack)
    }

    addUser(user){
        this.users.push(user)
    }

    getConferenceInfo(){
        console.log(`${this.field} conference, ID ${this.id}, usuarios: ${this.users.length}`);
    }

    createTrack(type, topic, deadline, acceptanceMethod, user) {
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
                throw new Error('Invalid track type.');
        }

        this.tracks.push(track);
    }

    getConferenceInfo(){
        return `Conference ID: ${this.id}\nField: ${this.field}\nNumber of Users: ${this.users.length}\nNumber of Tracks: ${this.tracks.length}`;
    }
}

module.exports = Conference;