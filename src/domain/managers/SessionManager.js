import UserManager from './UserManager.js';
import { createHash, generateToken, isValidPassword } from "../../utils/index.js";
import EmailManager from './EmailManager.js';

class SessionManager {

    async login(email, password) {

        if (!email && !password) {
            throw new Error('Email and password invalid format');
        }

        const manager = new UserManager();
        const user = await manager.getOneUser(email)

        const isHashedPassword = await isValidPassword(user, password);

        if (!isHashedPassword) {
            throw new Error('Password invalid');
        }

        return user;
    }

    async signup(data) {

        const manager = new UserManager();

        const payload = {
            ...data,
            password: await createHash(data.password)
        }

        const user = await manager.addUser(payload);
        return user;
    };

    async changePassword(password, confPassword, email) {

        if (password === confPassword) {

            const manager = new UserManager();
            manager.getOneUser(email)
            password = await createHash(password);

            const data = {
                password: password
            }

            await manager.updateUser(email, data);

            return "Password changed"

        }

        return "Algun dato es erroneo"
    }
}

export default SessionManager