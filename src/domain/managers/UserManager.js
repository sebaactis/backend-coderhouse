import container from '../../container.js';
import { createHash } from '../../utils/index.js';

class UserManager {

    constructor() {
        this.dao = container.resolve('repositoryUser');
    }

    async addUser(user) {

        const payload = {
                ...user,
                password: await createHash(user.password)
        }

            let newUser = await this.dao.addUser(payload)
            return newUser;
    };

    async getUsers(page) { 
            let users = await this.dao.getUsers(page);
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

    async deleteUserByDate() {
        const date = new Date();
        const twoDaysAgo = new Date(date);
        twoDaysAgo.setDate(date.getDate() - 2);

        const newUsers = await this.dao.deleteUsersByDate(twoDaysAgo);

        console.log(newUsers);

        return newUsers
    }

  
}

export default UserManager;

