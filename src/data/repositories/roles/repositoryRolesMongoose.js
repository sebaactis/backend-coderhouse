import Role from '../../../domain/entities/role.js';
import { roleModel } from '../../models/role.model.js'

class repositoryRolesMongoose {

    async addRole(role) {

        const document = await roleModel.create(role);

        if (!document) {
            throw new Error("We cant add role")
        }

        return new Role({
            id: document._id,
            name: document.name
        }
        )
    };

    async getRoles() {

        const roleDocuments = await roleModel.paginate({}, { limit: 10, page: 1 });

        const { docs, ...pagination } = roleDocuments

        if (!roleDocuments) {
            throw new Error("Roles Not Found")
        }

        console.log(docs);

        const roles = docs.map(document => new Role({
            id: document._id,
            name: document.name
        }
        ))

        return { roles, pagination }
    };


    async getRoleById(id) {

        const document = await roleModel.findOne({ _id: id })

        if (!document) {
            throw new Error('Role Not Found')
        }

        return new Role({
            id: document._id,
            name: document.name
        }
        )
    }

    async updateRole(id, data) {

        const role = await roleModel.findOne({ _id: id })

        if (!role) {
            throw new Error('Role Not Found')
        }

        const document = await roleModel.updateOne({ _id: id, }, data)

        return new Role({
            id: document._id,
            name: document.name
        }
        )
    }

    async deleteRole(id) {
        const role = await roleModel.findOne({ _id: id })

        if (!role) {
            throw new Error('Role Not Found')
        }

        const document = await roleModel.deleteOne({ _id: id })

        return new Role({
            id: document._id,
            name: document.name
        }
        )
    }

}

export default repositoryRolesMongoose;