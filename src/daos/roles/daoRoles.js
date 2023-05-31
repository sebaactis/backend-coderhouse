import { roleModel } from '../../models/role.model.js'

class daoRoles {

    async addRole(role) {

        const newRole = await roleModel.create(role);

        return {
            id: newRole._id,
            name: newRole.name
        }
    };

    async getRoles() {

        const roles = await roleModel.paginate({}, { limit: 10, page: 1 });

        if (!roles) {
            throw new Error("Roles Not Found")
        }

        return roles
    };


    async getRoleById(id) {

        const role = await roleModel.findOne({ _id: id })

        if (!role) {
            throw new Error('Role Not Found')
        }

        return role
    }

    async updateRole(id, data) {

        const role = await roleModel.findOne({ _id: id })

        if (!role) {
            throw new Error('Role Not Found')
        }

        const newRole = await roleModel.updateOne({ _id: id, }, data)
        return newRole
    }

    async deleteRole(id) {
        const role = await roleModel.findOne({ _id: id })

        if (!role) {
            throw new Error('Role Not Found')
        }

        const roleDeleted = await roleModel.deleteOne({ _id: id })
        return roleDeleted;
    }

}

export default daoRoles;