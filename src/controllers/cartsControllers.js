import CartManager from '../managers/CartManager.js'

const manager = new CartManager()

export const create = async (req, res) => {

    await manager.newCart();

    res.status(201).json({ "message": "Cart created successfully" })
}

export const getCart = async (req, res) => {

    let id = req.params.cid;

    let cart = await manager.getCartProducts(id);

    if (cart !== "Cart not found") {
        res.status(200).json(cart)
        return;
    }

    res.status(404).json({ "message": "Cart not found" })
}

export const addToCart = async (req, res) => {

    const cartId = req.params.cid;
    const prodId = req.params.pid;
    
    let addProd = await manager.addProductCart(cartId, prodId)

    if (addProd === "Cart not found") {
        res.status(404).json({ "message": "Cart not found" })
        return;
    } else if (addProd === "Product not found") {
        res.status(404).json({ "message": "Product not found" })
        return;
    } else {
        res.status(200).json({ "message": "The product has been added in the cart" })
    }
}

export const updateCart = async (req, res) => {

    const cartId = req.params.cid
    const newCart = req.body

    let cart = await manager.updateCart(cartId, newCart)

    if(cart === 'Cart not found') {
        return res.status(404).json({ "message": "Cart doesn't exist" })
    }

    res.status(200).json({ "message": "Cart updated successfully" })
}

export const updateOneProductCart = async (req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid
    const newQuantity = req.body

    let cart = await manager.updateOneProductCart(cartId, prodId, newQuantity)

    if(cart === 'Cart not found') {
        return res.status(404).json({ "message": "Cart doesn't exist" })
    }

    res.status(200).json({ message: "The quantity of this products has been updated in the cart" })
}

export const removeFromCart = async (req, res) => {
    const cartId = req.params.cid
    const prodId = req.params.pid

    let cart = await manager.removeFromCart(cartId, prodId)

    if(cart === 'Cart not found') {
        return res.status(404).json({ "message": "Cart doesn't exist" })
    }

    res.status(200).json({message: "Product deleted from the cart"})

}

export const removeAllCart = async (req, res) => {
    
    const cartId = req.params.cid

    let cart = await manager.removeAllCart(cartId)

    if(cart === 'Cart not found') {
        return res.status(404).json({ "message": "Cart doesn't exist" })
    }

    res.status(200).json({message: "The cart has been empty"});
}