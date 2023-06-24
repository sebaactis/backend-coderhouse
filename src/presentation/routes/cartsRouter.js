import { Router } from 'express'
import { addToCart, create, getCart, purchase, removeAllCart, removeFromCart, updateCart, updateOneProductCart } from '../controllers/cartsControllers.js';
import authorization from '../middlewares/authorization.js';

const cartsRouter = Router();

cartsRouter.get('/:cid', getCart)
cartsRouter.post('/', create)
cartsRouter.post('/:cid/product/:pid', addToCart)
cartsRouter.post('/purchase/:cid', purchase)
cartsRouter.put('/:cid', updateCart)
cartsRouter.put('/:cid/products/:pid', updateOneProductCart)
cartsRouter.delete('/:cid/products/:pid', removeFromCart)
cartsRouter.delete('/:cid', removeAllCart)

export default cartsRouter;

