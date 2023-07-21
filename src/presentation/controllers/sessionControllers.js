import SessionManager from "../../domain/managers/SessionManager.js";
import { generateToken } from "../../utils/index.js";

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const manager = new SessionManager();

        const user = await manager.login(email, password);

        const accessToken = await generateToken(user);

        req.session.accessToken = accessToken;
        req.session.user = user;

        res.cookie('accessToken', accessToken, {
            maxAge: 10000,
            httpOnly: true
        })

        res.send({ accessToken, message: 'Login success!' });
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

    const manager = new SessionManager()

    let user = await manager.signup(req.body);

    res.status(201).json({ status: "success", user, message: "User added successfully" });

};

export const forgotPassword = async (req, res, next) => {

    try {
        const { email } = req.body;

        const manager = new SessionManager();

        const newPassword = await manager.forgotPassword(email);

        res.status(200).json({ status: "success" });



    }
    catch (e) {
        next(e);
    }
}

export const current = async (req, res, next) => {

    try {

        const payload = req.body;

        res.status(200).send({ status: 'Success', payload: payload });

    }

    catch (e) {
        next(e)
    }

};