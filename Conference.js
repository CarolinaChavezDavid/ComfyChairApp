const PosterTrack = require('./track/PosterTrack');
const RegularTrack = require('./track/RegularTrack');
const User = require('./track/Track');
const WorkshopTrack = require('./track/WorkshopTrack');

class Conference {
    constructor(field) {
        this.id = Math.floor(Math.random() * 1000000)
        this.field = field
        this.users = []
        this.tracks = []
    }

    createTrack(track) {
        this.tracks.push(track)
    }

    submitPublicationToTrack(topic, publication, user){
        const track = this.findTrack(topic);
        if (!track) {
            throw new Error(`La sesion "${trackName}" no fue encontrada en la conferencia "${this.field}".`);
        }
        if(!this.isUserRegistered(user)){
            this.users.push(user)
        }

        track.submitPublication(publication, user)
    }

    isUserRegistered(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === user.email) {
                return true;
            }
        }
        return false;
    }

    findTrack(topic) {
        return this.tracks.find(track => track.topic.toLowerCase() === topic.toLowerCase());
    }

    registerUser(user) {
        this.users.push(user)
    }

    getConferenceInfo() {
        console.log(`Conferencia: ${this.field}, ID ${this.id}, usuarios: ${this.users.length}, sesiones: ${this.tracks.length}`);
    }

    getTracksInfo() {
        this.tracks.forEach((item) => {
            item.getTrackInfo()
        })
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
                throw new Error('Tipo de sesión invalido.');
        }

        this.tracks.push(track);
    }
}

module.exports = Conference;