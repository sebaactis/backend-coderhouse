import RoleManager from '../../domain/managers/RoleManager.js';

const manager = new RoleManager();

export const getAll = async (req, res, next) => {

    try {
        let roles = await manager.getRoles();
        res.status(200).json({ message: 'success', roles })
    }
    catch (e) {
        next(e);
    }
}

export const getOne = async (req, res, next) => {

    try {
        const id = req.params.pid;
        const role = await manager.getRoleById(id)
        res.status(200).json(role)
    }
    catch (e) {
        next(e);
    }
    
};

export const create = async (req, res, next) => {
    try {
        const role = req.body;
        await manager.addRole(role);
        res.status(200).json({ message: 'success', role })
    }
    catch (e) {
        next(e);
    }
};

export const update = async (req, res, next) => {

    try {
        let id = req.params.pid;
        let data = req.body;
        await manager.updateRole(id, data);
        res.status(200).json({ message: 'success', payload: 'Role updated'});
    }
    catch (e) {
        next(e);
    }

};

export const deleteOne = async (req, res, next) => {

    try {
        const id = req.params.pid;
        await manager.deleteRole(id);
        res.status(200).json({ message: 'success', payload: 'Role deleted'});
    }
    catch (e) {
        next(e);
    }
};


