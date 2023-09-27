import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import * as bcrypt from 'bcrypt';

const app = new App();

const bike = new Bike('mountain bike', 'mountain', 123, 500, 100.5, 'desc', 5, [], 'bike1');
const user = new User('Maria', 'maria@mail.com', '1234');

app.registerUser(user);

const today = new Date();
const twoDaysFromToday = new Date();
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2);

const rentPrice = app.rentBike(user, bike, today, twoDaysFromToday);

if (rentPrice !== undefined) {
    console.log(`Aluguel criado. Preço: ${rentPrice}`);
} else {
    console.log('Erro ao criar aluguel.');
}

const user2 = new User('Joao', 'joao@mail.com', '3123');
app.registerUser(user2);

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const sevenDaysFromToday = new Date();
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7);

const bike2 = new Bike('city bike', 'urban', 110, 300, 50.0, 'desc2', 4, [], 'bike2');
app.registerBike(bike2);

const rentPrice2 = app.rentBike(user2, bike2, tomorrow, sevenDaysFromToday);

if (rentPrice2 !== undefined) {
    console.log(`Aluguel criado. Preço: ${rentPrice2}`);
} else {
    console.log('Erro ao criar aluguel.');
}

const returnedDate1 = new Date();
returnedDate1.setDate(returnedDate1.getDate() + 1);
const returnedDate2 = new Date();
returnedDate2.setDate(returnedDate2.getDate() + 3);

const price1 = app.returnBike(app.rents[0], returnedDate1);
const price2 = app.returnBike(app.rents[1], returnedDate2);

if (price1 !== undefined) {
    console.log(`Valor do aluguel 1: ${price1}`);
} else {
    console.log('Erro ao calcular o valor do aluguel 1.');
}

if (price2 !== undefined) {
    console.log(`Valor do aluguel 2: ${price2}`);
} else {
    console.log('Erro ao calcular o valor do aluguel 2.');
}

console.log('Lista de Usuários:');
console.log(app.listUsers());

console.log('Lista de Bicicletas:');
console.log(app.listBikes());


const updated = app.updateBikeLocation('bike1', { latitude: 40.7128, longitude: -74.0060 });

if (updated) {
    console.log('Localização da bicicleta atualizada com sucesso.');
} else {
    console.log('Bicicleta não encontrada.');
}

const authenticatedUser = app.authenticateUser('maria@mail.com', '1234');

if (authenticatedUser) {
    console.log(`Usuário autenticado: ${authenticatedUser.name}`);
} else {
    console.log('Autenticação falhou. Verifique suas credenciais.');
}
try {
    const moved = app.moveBike('bike3', { latitude: 41.8781, longitude: -87.6298 });
    if (moved) {
        console.log('Bicicleta movida com sucesso.');
    } else {
        console.log('Erro ao mover a bicicleta.');
    }
} catch (error) {
    console.log('Erro ao mover a bicicleta:', error.message);
}
