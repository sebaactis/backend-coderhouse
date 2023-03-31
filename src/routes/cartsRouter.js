import { Router } from 'express'
import CartManager from '../CartManager.js';

const cartsManager = new CartManager();
const cartsRouter = Router();


cartsRouter.post('/', async (req, res) => {
    await cartsManager.newCart();

    res.status(201).json({ "message": "Cart created successfully" })
})

cartsRouter.get('/:cid', async (req, res) => {

    let id = +req.params.cid;
    let cart = await cartsManager.getCartProducts(id);

    if (cart !== "Cart not found") {
        res.status(200).json(cart)
        return;
    }

    res.status(404).json({ "message": "Cart not found" })

})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {

    const cartId = +req.params.cid;
    const prodId = +req.params.pid;

    let addProd = await cartsManager.addProductCart(cartId, prodId)

    if (addProd === "Cart not exists") {
        res.status(404).json({ "message": "The cart doesnt exist" })
        return;
    } else if (addProd === "Product doesnt exists") {
        res.status(404).json({ "message": "The product doesnt exist" })
        return;
    } else {
        res.status(200).json({ "message": "The product has been added in the cart" })
    }


})


export default cartsRouter;

