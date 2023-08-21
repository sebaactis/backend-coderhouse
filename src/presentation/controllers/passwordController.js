import EmailManager from "../../domain/managers/EmailManager.js";
import SessionManager from "../../domain/managers/SessionManager.js";

export const forgotPassword = async (req, res, next) => {

    try {
        const { email } = req.body;

        const manager = new EmailManager();
        await manager.send( "forgotPassword.hbs" ,email);

        res.status(200).json({ status: 'success', message: "Email de recuperacion enviado" })

    }
    catch (e) {
        next(e);
    }
}

export const updatePassword = async (req, res, next) => {

    try {
        res.render('home')
    }
    catch (e) {
        next(e);
    }
}

export const changePassword = async (req, res, next) => {

    try {
        const { password, confPassword, email } = req.body;

        const manager = new SessionManager();

        const change = await manager.changePassword(password, confPassword, email)

        res.status(200).json({ status: 'success', message: change })

    }
    catch (e) {
        next(e);
    }
}