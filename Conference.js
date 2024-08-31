const PosterTrack = require('./track/model/PosterTrack');
const RegularTrack = require('./track/model/RegularTrack');
const User = require('./track/model/Track');
const WorkshopTrack = require('./track/model/WorkshopTrack');
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

    submitPublicationToTrack(topic, publication) {

        if (!track) {
            throw new Error(`La sesion "${topic}" no fue encontrada en la conferencia "${this.field}".`);
        }
        publication.leadAuthor = this.updateUserAsAuthor(publication.leadAuthor)
        track.submitPublication(publication)
    }

    updateUserAsAuthor(user) {
        if (!user.hasRole('author')) {  // Cambiado para usar el método hasRole del User
            return new AuthorRole(user);
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
        if(this.isUserRegistered(user)){
            throw new Error(`El usuario "${user.name}" ya esta registrado en la conferencia".`);
        } 
        this.users.push(user)
        this.tracks.forEach(track => track.registerUser(user))
        
    }

    getConferenceInfo() {
        console.log(`Conferencia: ${this.field}, ID ${this.id}, usuarios: ${this.users.length}, sesiones: ${this.tracks.length}`);
    }

    getTracksInfo() {
        this.tracks.forEach((item) => {
           console.log(item)
        })
    }

    createTrack(type, topic, selectionMethod, user) {
        if (!this.isUserRegistered(user)) {
            throw new Error(`El usuario "${user.name} ${user.lastName}" no esta registrado en la conferncia.`);
        }
        if (!user.hasRole('chair')) {
            throw new Error('Solo los organizadores pueden crear sesiones.');
        }

        let track;
        switch (type) {
            case 'regular':
                track = new RegularTrack(topic, selectionMethod);
                break;
            case 'workshop':
                track = new WorkshopTrack(topic, selectionMethod);
                break;
            case 'poster':
                track = new PosterTrack(topic, selectionMethod);
                break;
            default:
                throw new Error('Tipo de sesión invalido.');
        }
        this.users.forEach(user => track.registerUser(user))
        this.tracks.push(track);
        return track;
    }
}

module.exports = Conference;