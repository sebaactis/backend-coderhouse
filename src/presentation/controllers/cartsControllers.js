import CartManager from '../../domain/managers/CartManager.js'

const manager = new CartManager()

export const create = async (req, res, next) => {

    try {
        const email = req.body.email
        await manager.newCart(email);
        res.status(201).json({ "message": "Cart created successfully" })
    }

    catch (e) {
        next(e);
    }

}

export const getCart = async (req, res, next) => {

    try {
        let id = req.params.cid;
        let cart = await manager.getCartProducts(id);
        res.status(200).json({ message: 'success', cart });
    }

    catch (e) {
        next(e);
    }

}

export const addToCart = async (req, res, next) => {

    try {
        const cartId = req.params.cid;
        const prodId = req.params.pid;
        await manager.addProductCart(cartId, prodId);
        res.status(200).json({ message: `Product ${prodId} has been added to cart` });
    }
    catch (e) {
        next(e);
    }

}

export const updateCart = async (req, res, next) => {

    try {
        const cartId = req.params.cid
        const newCart = req.body
        const cart = await manager.updateCart(cartId, newCart)
        res.status(200).json({ "message": `Cart updated successfully` })
    }
    catch (e) {
        next(e);
    }


}

export const updateOneProductCart = async (req, res, next) => {

    try {
        const cartId = req.params.cid
        const prodId = req.params.pid
        const newQuantity = req.body

        let cart = await manager.updateOneProductCart(cartId, prodId, newQuantity)
        res.status(200).json({ message: "Product updated successfully" })

    }
    catch (e) {
        next(e);
    }
}

export const removeFromCart = async (req, res, next) => {
    try {
        const cartId = req.params.cid
        const prodId = req.params.pid

        let cart = await manager.removeFromCart(cartId, prodId)
        res.status(200).json({ message: "Product deleted from the cart" })

    }
    catch (e) {
        next(e);
    }
}

export const removeAllCart = async (req, res, next) => {

    try {
        const cartId = req.params.cid
        let cart = await manager.removeAllCart(cartId)
        res.status(200).json({ message: "The cart has been empty" });

    }
    catch (e) {
        next(e);
    }

}

export const purchase = async (req, res, next) => {
    try {
        const cartId = req.params.cid
        const compra = await manager.purchase(cartId)
        res.status(200).json({ message: "The purchase has been successfully", status: compra })
    }
    catch (e) {
        next(e);
    }
}