import daoUserMongoose from '../daos/users/daoUser.js';
import { createHash } from "../utils/index.js";

class UserManager {

    constructor() {
        this.dao = new daoUserMongoose();
    }

    async addUser(user) {

            const payload = {
                ...user,
                password: await createHash(user.password)
            }

            let newUser = await this.dao.addUser(payload)
            return newUser;
    };

    async getUsers() { 
            let users = await this.dao.getUsers();
            return users
    };

    async getOneUser(email) {
            let user = await this.dao.getOneUser(email);
            return user
    }

    async updateUser(email, data) {
            let user = await this.dao.updateUser(email, data);
            return user
    }

    async deleteUser(email) {
            let user = await this.dao.deleteUser(email)
            return user
    }

}

export default UserManager;

