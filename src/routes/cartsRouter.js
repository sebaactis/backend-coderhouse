import { Router } from 'express'
import { addToCart, create, getCart } from '../controllers/cartsControllers.js';

const cartsRouter = Router();

cartsRouter.post('/', create)
cartsRouter.get('/:cid', getCart)
cartsRouter.post('/:cid/product/:pid', addToCart)

export default cartsRouter;

