import User from "../../../domain/entities/user.js";
import { userModel } from "../../models/users.model.js"

class repositoryUserMongoose {

    async addUser(user) {

        let document = await userModel.create(user);

        return new User({
            id: document.id,
            firstName: document.firstName,
            lastName: document.lastName,    
            email: document.email,
            age: document.age,
            role: document.role
        })
    };

    async getUsers() {

        const userDocuments = await userModel.paginate({}, { limit: 10, page: 1 });

        const { docs, ...paginate } = userDocuments

        if (!userDocuments) {
            throw new Error("Users not found");
        }

        const users = docs.map(document => new User({
            id: document.id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            role: document.role
        }))

        return {
            users,
            paginate
        }
    };

    async getOneUser(email) {
        const document = await userModel.findOne({ email });

        if (!document) {
            throw new Error("User Not Found");;
        }

        console.log(document);

        return new User({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            role: document.role,
            password: document.password
        })
    }

    async updateUser(email, data) {

        const userFind = await userModel.findOne({ email });

        if (!userFind) {
            throw new Error("User Not Found")
        }

        const document = await userModel.updateOne({ email }, data);

        return new User({
            id: document.id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            role: document.role
        })
    }

    async deleteUser(email) {
        const userFind = await userModel.findOne({ email });

        if (!userFind) {
            throw new Error("User Not Found")
        }

        const document = await userModel.deleteOne({ email })

        return new User({
            id: document.id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age,
            role: document.role
        })
    }

}

export default repositoryUserMongoose;