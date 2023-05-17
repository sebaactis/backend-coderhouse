import SessionManager from "../managers/SessionManager.js";
import { generateToken } from "../utils/index.js";

export const login = async (req, res) => {

    try {

        const { email, password } = req.body
        const manager = new SessionManager();

        let user = await manager.login(email, password);

        if (user === 'Login failed') {
            return res.status(401).send({ message: "Login failed, password is incorrect" })
        }

        /* req.session.user = { email }; */
        const accessToken = await generateToken(user);

        res.send({ accessToken, message: 'Login success!' });
        /* res.status(200).send({ message: "Login successfull" }); */

    }
    
    catch (e) {
        next(e);
    }



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

    const manager = new SessionManager();
    const data = req.body;

    let user = await manager.signup(data);

    res.status(201).json({ status: "success", user, message: "User added successfully" });

};

export const forgotPassword = async (req, res) => {

    const { email, password } = req.body;
    const manager = new SessionManager();

    await manager.forgotPassword(email, password);

    res.status(200).json({ status: "success", message: "Password updated successfully" });


}

export const current = async (req, res) => {

    res.status(200).send({ status: 'Success', payload: req.user });

};