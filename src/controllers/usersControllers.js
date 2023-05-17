import UserManager from '../managers/UserManager.js'

const manager = new UserManager();

export const getAll = async (req, res, next) => {

    try {
        let users = await manager.getUsers();
        res.status(200).json({ message: "success", payload: users })
    }
    catch (e) {
        next(e);
    }

}

export const getOne = async (req, res, next) => {

    try {
        const email = req.params.email
        let user = await manager.getOneUser(email);
        res.status(200).json({ message: "success", payload: user })
    }
    catch (e) {
        next(e);
    }

};

export const create = async (req, res) => {

    await manager.addUser(req.body);

    res.status(200).json({ message: "success", payload: req.body })

};

export const update = async (req, res, next) => {

    let email = req.params.email
    let data = req.body;

    try {
        await manager.updateUser(email, data)
        res.status(200).json({ message: "User updated", payload: data })
    }
    catch (e) {
        next(e)
    }


};

export const deleteOne = async (req, res, next) => {

    let email = req.params.email

    try {
        await manager.deleteUser(email)
        res.status(200).json({ message: "User deleted" });
    }
    catch (e) {
        next(e);
    }
    
};