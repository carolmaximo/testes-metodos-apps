import * as bcrypt from 'bcrypt';
export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public passwordHash: string | undefined = undefined,
        public id?: string
    ) {
        if (passwordHash === undefined) {
            this.passwordHash = this.hashPassword(password);
        }
    }

    private hashPassword(password: string): string {
        const saltRounds = 10; // Você pode ajustar o número de rounds de acordo com sua preferência.
        return bcrypt.hashSync(password, saltRounds);
    }

    public verifyPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.passwordHash || '');
    }
}
