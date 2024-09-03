const Constants = require('../utils/Constants');
const BestPublicationsMethod = require('../track/selection/BestPublicationsMethod');
const FixSetMethod = require('../track/selection/FixSetMethod');
const SelectionMethodStrategy = require('../track/selection/SelectionMethodStrategy');
const PosterPublication = require('../publication/PosterPublication');
const RegularPublication = require('../publication/RegularPublication');
const Publication = require('../publication/Publication');
const User = require('../user/User');
const Review = require('../publication/Review');
const DataFactory = require('./testDataFactory');

describe('Publication and Subclasses', () => {
    
    let publication, poster, regular, user;

    beforeEach(() => {
        user = DataFactory.createUserFerAuthor();
        publication = new Publication('Título de prueba', 'archivo.pdf', user);
        poster = new PosterPublication('Poster Title', 'poster.pdf', user, ['source1']);
        regular = new RegularPublication('Regular Title', 'regular.pdf', user, 'Un resumen');
    });

    test('Publication: Debe lanzar un error si el método getType() no se sobrescribe en subclases', () => {
        expect(() => publication.getType()).toThrowError("El método 'getType()' debe ser implementado.");
    });

    test('Publication: Debe añadir un autor correctamente', () => {
        const author = new User('María', 'González', 'maria@example.com', 'password', 'author');
        publication.addAuthor(author);
        expect(publication.authors).toContain(author);
    });

    test('Publication: Debe calcular correctamente el puntaje final basado en las revisiones', () => {
        publication.submitReview(new Review(3, 'Buena revisión', user));
        publication.submitReview(new Review(1, 'Muy buena revisión', user));
        publication.submitReview(new Review(2, 'Revisión aceptable', user));
        publication.calculateFinalScore();
        expect(publication.finalScore).toBe(2);
    }); 

    test('PosterPublication: Debe retornar el tipo correcto', () => {
        expect(poster.getType()).toBe('poster');
    });

    test('RegularPublication: Debe retornar el tipo correcto', () => {
        expect(regular.getType()).toBe('regular');
    });
});

describe('Selection Methods', () => {
    
    let method, publications, user;

    beforeEach(() => {
        user = DataFactory.createUserFerAuthor();
        publications = [
            new RegularPublication('Title 1', 'file.pdf', user, 'Abstract 1'),
            new RegularPublication('Title 2', 'file.pdf', user, 'Abstract 2'),
            new RegularPublication('Title 3', 'file.pdf', user, 'Abstract 3')
        ];
    });

    describe('BestPublicationsMethod', () => {
        beforeEach(() => {
            method = new BestPublicationsMethod(3);
        });

        test('AL no tener revisores deberia devolver NaN y ser rechazado', () => {
            publications[0].finalScore = 6;
            publications[1].finalScore = 2;
            publications[2].finalScore = 1;

            console.log(method)

            method.executeMethod(publications);

            expect(publications[0].state).toBe(Constants.PUBLICATION_STATE.REJECTED);
            expect(publications[1].state).toBe(Constants.PUBLICATION_STATE.REJECTED);
            expect(publications[2].state).toBe(Constants.PUBLICATION_STATE.REJECTED);
        });
    });

    describe('FixSetMethod', () => {
        beforeEach(() => {
            method = new FixSetMethod(0.5);
        });

        test('Debe seleccionar un porcentaje fijo de publicaciones', () => {
            publications[0].finalScore = 5;
            publications[1].finalScore = 2;
            publications[2].finalScore = 1;

            method.executeMethod(publications);

            expect(publications[0].state).toBe(Constants.PUBLICATION_STATE.SELECTED);
            expect(publications[1].state).toBe(Constants.PUBLICATION_STATE.SELECTED);
            expect(publications[2].state).toBe(Constants.PUBLICATION_STATE.REJECTED);
        });
    });

    describe('SelectionMethodStrategy', () => {
        test('Debe lanzar error si no se implementan métodos abstractos', () => {
            const strategy = new SelectionMethodStrategy();
            expect(() => strategy.getType()).toThrowError("El método 'getType()' debe ser implementado.");
            expect(() => strategy.executeMethod([])).toThrowError("El método 'executeMethod()' debe ser implementado.");
        });
    });
});
