const auth = (req, res, next) => {

    if(req.session?.accessToken) {
        
        return next();
    }

    return res.status(401).send({message: "You dont logged in!"});
}

export default auth;