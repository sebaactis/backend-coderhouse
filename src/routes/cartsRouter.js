import { Router } from 'express'
import { addToCart, create, getCart, removeAllCart, removeFromCart, updateCart, updateOneProductCart } from '../controllers/cartsControllers.js';

const cartsRouter = Router();

cartsRouter.get('/:cid', getCart)
cartsRouter.post('/', create)
cartsRouter.post('/:cid/product/:pid', addToCart)
cartsRouter.put('/:cid', updateCart)
cartsRouter.put('/:cid/products/:pid', updateOneProductCart)
cartsRouter.delete('/:cid/products/:pid', removeFromCart)
cartsRouter.delete('/:cid', removeAllCart)

export default cartsRouter;

