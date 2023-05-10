import UserManager from "../managers/UserManager.js";
import bcrypt from 'bcrypt'

export const login = async (req, res) => {

    const { email, password } = req.body

    if (!email && !password) {
        throw new Error("Email and password invalid format");
    }

    const manager = new UserManager();
    const user = await manager.getOneUser(email)
    const isHashedPassword = bcrypt.compare(password, user.password)

    if (!isHashedPassword) {
        return res.status(401).send({ message: "Login failed, password is incorrect" })
    }

    req.session.user = { email };

    res.send({ message: "Login successfull" });

}

export const logout = async (req, res) => {

    req.session.destroy(err => {
        if (err) {
            return res.json({ message: 'Logout failed' });
        }

        res.send({ message: 'Logout successfull' });
    });
};

export const signup = async (req, res) => {

    const manager = new UserManager();

    const payload = {
        ...req.body,
        password: await bcrypt.hash(req.body.password, 10)
    }

    const user = await manager.addUser(payload);

    res.status(201).json({ status: "success", user, message: "User added successfully" });

};