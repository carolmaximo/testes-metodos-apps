import { App } from './app';
import { Bike } from './bike';
import { Rent } from './rent';
import { User } from './user';

describe('App', () => {
    let app: App;

    beforeEach(() => {
        app = new App();
    });

    it('should register a user', () => {
        const user = new User('Maria', 'maria@mail.com', '1234');
        app.registerUser(user);
        const registeredUser = app.findUser('maria@mail.com');
        expect(registeredUser).toEqual(user);
    });

    it('should throw an error when registering a duplicate user', () => {
        const user = new User('Maria', 'maria@mail.com', '1234');
        app.registerUser(user);
        expect(() => app.registerUser(user)).toThrow('Duplicate user.');
    });

    it('should register a bike', () => {
        const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], 'bike1');
        app.registerBike(bike);
        const registeredBike = app.bikes.find(b => b.id === 'bike1');
        expect(registeredBike).toEqual(bike);
    });

    it('should remove a user', () => {
        const user = new User('Maria', 'maria@mail.com', '1234');
        app.registerUser(user);
        app.removeUser('maria@mail.com');
        const removedUser = app.findUser('maria@mail.com');
        expect(removedUser).toBeUndefined();
    });

    it('should rent a bike', () => {
        const user = new User('Maria', 'maria@mail.com', '1234');
        const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], 'bike1');
        const today = new Date();
        const twoDaysFromToday = new Date();
        twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);
        const rentPrice = app.rentBike(user, bike, today, twoDaysFromToday);
        expect(rentPrice).toBeGreaterThan(0);
    });

    it('should return a bike', () => {
        const user = new User('Maria', 'maria@mail.com', '1234');
        const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], 'bike1');
        const today = new Date();
        const twoDaysFromToday = new Date();
        twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);
        const rentPrice = app.rentBike(user, bike, today, twoDaysFromToday);
        const returnedDate = new Date();
        returnedDate.setDate(returnedDate.getDate() + 1);
        const returnPrice = app.returnBike(app.rents[0], returnedDate);
        expect(returnPrice).toBeGreaterThan(0);
    });

    it('should authenticate a user', () => {
        const user = new User('Maria', 'maria@mail.com', '1234');
        app.registerUser(user);
        const authenticatedUser = app.authenticateUser('maria@mail.com', '1234');
        expect(authenticatedUser).toEqual(user);
    });

    it('should update bike location', () => {
        const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], 'bike1');
        app.registerBike(bike);
        const updated = app.updateBikeLocation('bike1', { latitude: 40.7128, longitude: -74.0060 });
        expect(updated).toBe(true);
    });

    it('should throw an error when updating location of an unregistered bike', () => {
        expect(() => app.updateBikeLocation('bike2', { latitude: 40.7128, longitude: -74.0060 })).toThrow('Bicicleta não encontrada.');
    });
});
