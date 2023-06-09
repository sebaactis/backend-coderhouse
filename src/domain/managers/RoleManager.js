import daoRoles from '../../data/daos/roles/daoRoles.js';

class RoleManager {

    constructor() {
        this.dao = new daoRoles();
    }

    async addRole(role) {
        const newRole = await this.dao.addRole(role);
        return newRole;
    };

    async getRoles() {

        const roles = await this.dao.getRoles();
        return roles
    };

    async getRoleById(id) {
        const role = await this.dao.getRoleById(id)
        return role

    }

    async updateRole(id, data) {

        const role = await this.dao.updateRole(id, data);
        return role
    }

    async deleteRole(id) {
        const role = await this.dao.deleteRole(id);
        return role;
    }
}

export default RoleManager;


