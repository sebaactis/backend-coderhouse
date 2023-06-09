const authorization = (permission) => {

    return async (req, res, next) => {

        const user = req.session.user

        if (user?.role?.name.includes(permission)) {

            return next();
        }

        return res.status(401).send({ message: "No authorized" });
    }
}



export default authorization;