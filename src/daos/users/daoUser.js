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

        const users = await userModel.find();

        if (!users) {
            throw new Error("Users not found");
        }

        return users
    };

    async getOneUser(email) {
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User Not Found");;
        }
        return user
    }

    async updateUser(email, data) {

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User Not Found")
        }

        const userUpdate = await userModel.updateOne({ email }, data);
        return userUpdate
    }

    async deleteUser(email) {
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User Not Found")
        }

        const userDeleted = await userModel.deleteOne({ email })
        return userDeleted
    }

}

export default daoUserMongoose;