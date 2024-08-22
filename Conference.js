const PosterTrack = require('./track/PosterTrack');
const RegularTrack = require('./track/RegularTrack');
const User = require('./track/Track');
const WorkshopTrack = require('./track/WorkshopTrack');
const AuthorRole = require('./user/AuthorRole');

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

    submitPublicationToTrack(topic, publication){
        const track = this.findTrack(topic);
        if(!this.isUserRegistered(publication.leadAuthor)){
            throw new Error(`El usuario ${publication.leadAuthor.name} ${publication.leadAuthor.lastName} no esta registrado en la conferencia.`);
        }
        if (!track) {
            throw new Error(`La sesion "${topic}" no fue encontrada en la conferencia "${this.field}".`);
        }
        publication.leadAuthor = this.updateUserAsAuthor(publication.leadAuthor)
        track.submitPublication(publication)
    }

    updateUserAsAuthor(user){
        if (!user.roles.has('author')) {
            return new AuthorRole(user)
        }
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
        if(!this.isUserRegistered(user)){
            throw new Error(`El usuario "${user.name}" no esta registrado en la conferncia.`);
        }
        if (!user.hasRole('chair')) {
            throw new Error('Solo los organizadores pueden crear sesiones.');
        }

        let track;
        switch (type) {
            case 'regular':
                track = new RegularTrack(topic, deadline, acceptanceMethod, this.users);
                break;
            case 'workshop':
                track = new WorkshopTrack(topic, deadline, acceptanceMethod, this.users);
                break;
            case 'poster':
                track = new PosterTrack(topic, deadline, acceptanceMethod, this.users);
                break;
            default:
                throw new Error('Tipo de sesión invalido.');
        }

        this.tracks.push(track);
    }
}

module.exports = Conference;