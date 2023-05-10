import { userModel } from "../../models/users.model.js"

class daoUserMongoose {

    async addUser(user) {
        try {
            let newUser = await userModel.create(user);

            return {
                id: newUser._id,
                firstName: newUser.firstName,
                email: newUser.email,
                age: newUser.age
            }
        }

        catch {
            throw new Error("We cant add user, try again");
        }
    };

    async getUsers() {
        try {
            const users = await userModel.find();
            return users
        }

        catch {
            throw new Error("We cant show the users, try again");
        }
    };

    async getOneUser(email) {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return "User not exist";
            }

            return user
        }
        catch {
            throw new Error("We cant show the user, try again");
        }
    }

    async updateUser(email, data) {
        try {
            const user = await userModel.updateOne({ email }, data);
            return user
        }
        catch {
            return "We cant update"
        }
    }

    async deleteUser(email) {
        try {
            const userDeleted = await userModel.deleteOne({ email })
            return userDeleted
        }
        catch {
            return "We cant delete"
        }
    }

}

export default daoUserMongoose;