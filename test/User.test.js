const User = require("../user/User");

describe('User Class', () => {
  let user;

  beforeEach(() => {
    user = new User('Carolina', 'Chavez', 'scchavezd@gmail.com', 'password123', 'UNLP');
  });

  test('un usuario nuevo se crea con las propiedades correctas', () => {
    expect(user.name).toBe('Carolina');
    expect(user.lastName).toBe('Chavez');
    expect(user.email).toBe('scchavezd@gmail.com');
    expect(user.password).toBe('password123');
    expect(user.membership).toBe('UNLP');
  });

  test('agrega correctamenta un rol al ususario', () => {
    user.addRole('author');
    expect(user.getRoles()).toContain('author');
  });

  test('remueve correctamente el rol al usuario', () => {
    user.addRole('author');
    user.removeRole('author');
    expect(user.getRoles()).not.toContain('author');
  });

  test('obtiene todos los roles del usuario', () => {
    user.addRole('author');
    user.addRole('reviewer');
    expect(user.getRoles()).toEqual(['author', 'reviewer']);
  });

  test('deberia mostrar la informacion del usuario con roles', () => {
    user.addRole('author');
    user.addRole('reviewer');
    console.log = jest.fn();
    user.getUserInfo();
    expect(console.log).toHaveBeenCalledWith('Carolina Chavez tiene los roles: author, reviewer');
  });

  test('deberia mostrar la informacion del usurio sin roles', () => {
    console.log = jest.fn();
    user.getUserInfo();
    expect(console.log).toHaveBeenCalledWith('Carolina Chavez usuario registrado');
  });
});
