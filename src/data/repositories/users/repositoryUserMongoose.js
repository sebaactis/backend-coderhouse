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
            role: document.role,
            connection: document.connection
        })
    };

    async getUsers(page) {

        const userDocuments = await userModel.paginate({}, { limit: 50, page: page });

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
            role: document.role,
            connection: document.connection
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
            password: document.password,
            connection: document.connection
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
            role: document.role,
            connection: document.connection
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
            role: document.role,
            connection: document.connection
        })
    }

    async deleteUsersByDate(days) {
        const usersDeleted = await userModel.deleteMany({ connection: {$lt: days} })

        if(!usersDeleted) {
            return 'No se pudieron borrar los usuarios'
        }

        return 'Usuarios sin conexion hace mas 2 dias eliminados'
    }

}

export default repositoryUserMongoose;