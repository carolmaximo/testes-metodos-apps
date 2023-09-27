import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }

    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.');
            }
        }
        user.id = crypto.randomUUID();
        this.users.push(user);
    }

    registerBike(bike: Bike): void {
        this.bikes.push(bike);
    }

    removeUser(email: string): void {
        const index = this.users.findIndex(user => user.email === email);
        if (index !== -1) {
            this.users.splice(index, 1);
        }
    }

    rentBike(user: User, bike: Bike, startDate: Date, endDate: Date): number | undefined {
        if (!bike.isAvailable) {
            console.log('Bicicleta não disponível para aluguel.');
            return undefined;
        }

        const rentDuration = endDate.getTime() - startDate.getTime();
        const rentPrice = rentDuration * bike.rate;

        const rent = new Rent(bike, user, startDate, endDate);
        this.rents.push(rent);


        bike.isAvailable = false;

        return rentPrice;
    }

    returnBike(rent: Rent, returnedDate: Date): number | undefined {
        if (!rent.dateReturned) {
            rent.dateReturned = returnedDate;

   
            rent.bike.isAvailable = true;

       
            const rentDuration = returnedDate.getTime() - rent.dateFrom.getTime();
            const rentPrice = rentDuration * rent.bike.rate;

            return rentPrice;
        }

        return undefined;
    }

    listUsers(): User[] {
        return this.users;
    }

    listBikes(): Bike[] {
        return this.bikes;
    }

    authenticateUser(email: string, password: string): User | undefined {
        const user = this.findUser(email);
        if (user && user.verifyPassword(password)) {
            return user;
        }
        return undefined;
    }

    moveBike(bikeId: string, newLocation: { latitude: number, longitude: number }): boolean {
        const bike = this.bikes.find(b => b.id === bikeId);

        if (!bike) {
            throw new Error('Bicicleta não encontrada.');
        }

        bike.location = newLocation;
        return true;
    }

    updateBikeLocation(bikeId: string, newLocation: { latitude: number, longitude: number }): boolean {
        const bike = this.bikes.find(b => b.id === bikeId);

        if (bike) {
            bike.location = newLocation;
            return true;
        }

        return false; 
    }
}
