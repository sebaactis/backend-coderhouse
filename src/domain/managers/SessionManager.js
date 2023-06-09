import UserManager from './UserManager.js';
import { createHash, isValidPassword } from "../../utils/index.js";

class SessionManager {

    async login(email, password) {

        if (!email && !password) {
            throw new Error('Email and password invalid format');
        }

        const manager = new UserManager();
        const user = await manager.getOneUser(email)

        const isHashedPassword = await isValidPassword(user, password);

        if(!isHashedPassword) {
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

    async forgotPassword(email, password) {
        const manager = new UserManager();
        const user = await manager.getOneUser(email);

        password = await createHash(password)
        user.password = password;

        await manager.updateUser(email, user);
        return user;

    }
}

export default SessionManager