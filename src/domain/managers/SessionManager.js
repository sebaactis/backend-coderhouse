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

    async forgotPassword(email) {
        const manager = new UserManager();
        const user = await manager.getOneUser(email);

        const token = await generateToken(user)

        const mailManager = new EmailManager();

        const mail = await mailManager.send('forgotPassword.hbs', email, token)

        return mail

    }

    async changePassword(password, confPassword, tokenConf, token) {
        if (password === confPassword && token === tokenConf) {
            return "password modificada"
        }

        return "Algun dato es erroneo"
    }
}

export default SessionManager