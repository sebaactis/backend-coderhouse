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

    if (addProd === "Cart not exists") {
        res.status(404).json({ "message": "The cart doesnt exist" })
        return;
    } else if (addProd === "Product doesnt exists") {
        res.status(404).json({ "message": "The product doesnt exist" })
        return;
    } else {
        res.status(200).json({ "message": "The product has been added in the cart" })
    }
}