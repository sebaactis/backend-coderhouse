import UserManager from '../managers/UserManager.js'

const manager = new UserManager();

export const getAll = async (req, res) => {
    
    let users = await manager.getUsers();

    console.log(users)

    res.status(200).json({message: "success", payload: users})
}

export const getOne = async (req, res) => {

    const email = req.params.email

    let user = await manager.getOneUser(email);

    res.status(200).json({message: "success", payload: user})
};

export const create = async (req, res) => {
    
    await manager.addUser(req.body);

    res.status(200).json({message: "success", payload: req.body })

};

export const update = async (req, res) => {

    let email = req.params.uid
    let data = req.body;

    await manager.updateUser(email, data)

    res.status(200).json({message: "User updated", payload: data})
};

export const deleteOne = async (req, res) => {

    let email = req.params.uid

    await manager.deleteUser(email)

    res.status(200).json({message: "User deleted"});
};