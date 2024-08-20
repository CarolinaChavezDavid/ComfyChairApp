const Publication = require('../publication/Publication');
const Poster = require('../publication/Poster');
const Regular = require('../publication/Regular');
const TestDataFactory = require('./testDataFactory');


describe('Clase Publicación', () => {
    let publicacion;

    beforeEach(() => {
        publicacion = TestDataFactory.createPublicationExample1();
    });

    test('debería inicializarse con las propiedades correctas', () => {
        expect(publicacion.title).toBe('Título de ejemplo');
        expect(publicacion.attachedFile).toBe('archivo.pdf');
        expect(publicacion.leadAuthor).toBe('Fernando Corinaldesi');
        expect(publicacion.state).toBe('inReview');
        expect(publicacion.authors).toEqual([]);
    });

    test('debería cambiar el estado', () => {
        publicacion.changeState('aprobado');
        expect(publicacion.state).toBe('aprobado');
    });

    test('debería lanzar un error cuando se llama a getType', () => {
        expect(() => publicacion.getType()).toThrow("El método 'getType()' debe ser implementado.");
    });
});

describe('Clase Póster', () => {
    let poster;

    beforeEach(() => {
        poster = new Poster('Póster de ejemplo', 'poster.pdf', 'Fernando Corinaldesi', '2024-08-20', ['Fuente1', 'Fuente2']);
    });

    test('debería retornar "poster" como tipo', () => {
        expect(poster.getType()).toBe('poster');
    });

    test('debería inicializarse con las propiedades correctas', () => {
        expect(poster.sources).toEqual(['Fuente1', 'Fuente2']);
    });
});

describe('Clase Regular', () => {
    let regular;

    beforeEach(() => {
        regular = new Regular('Artículo Regular de ejemplo', 'regular.pdf', 'Fernando Corinaldesi', '2024-08-20', 'Resumen de ejemplo');
    });

    test('debería retornar "regular" como tipo', () => {
        expect(regular.getType()).toBe('regular');
    });

    test('debería inicializarse con las propiedades correctas', () => {
        expect(regular.abstract).toBe('Resumen de ejemplo');
    });
});
