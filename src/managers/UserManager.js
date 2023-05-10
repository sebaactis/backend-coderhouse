import daoUserMongoose from '../daos/users/daoUser.js';

class UserManager {

    constructor() {
        this.dao = new daoUserMongoose();
    }

    async addUser(user) {
        try {
            let newUser = await this.dao.addUser(user)
            return newUser;
        }
        catch {
            return "We cant add user, try again"
        }
    };

    async getUsers() {
        try {
            let users = await this.dao.getUsers();
            return users
        }
        catch {
            return "We cant show you all users, try again"
        }

    };

    async getOneUser(email) {
        try {
            let user = await this.dao.getOneUser(email);
            return user
        }
        catch {
            return "We cant show you the user, try again"
        }
    }

    async updateUser(email, data) {
        try {
            let user = await this.dao.updateUser(email, data);
            return user
        }
        catch {
            return "We cant updated, try again"
        }
    }

    async deleteUser(email) {
        try {
            let user = await this.dao.deleteUser(email)
            return user
        }
        catch {
            return "We cant delete, try again"
        }
             
        
    }

}

export default UserManager;

