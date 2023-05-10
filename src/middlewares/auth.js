const auth = (req, res, next) => {

    if(req.session?.user?.email) {

        return next();

    }

    return res.status(401).send({message: "No authorized"});
}

export default auth;