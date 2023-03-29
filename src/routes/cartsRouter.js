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

    if (cart) {
        res.status(200).json(cart)
        return;
    }

    res.status(404).json({ "message": "Cart not found" })

})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {

    const cartId = +req.params.cid;
    const prodId = +req.params.pid;

    cartsManager.addProductCart(cartId, prodId)

    res.status(200).json({"message": "Request successfull"})

})


export default cartsRouter;

