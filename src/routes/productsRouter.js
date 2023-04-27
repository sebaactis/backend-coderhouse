import { Router } from 'express'
import { create, deleteOne, getAll, getOne, update } from '../controllers/productsControllers.js';

const productsRouter = Router();

productsRouter.get('/', getAll)
productsRouter.get('/:pid', getOne);
productsRouter.post('/', create);
productsRouter.put('/:pid', update);
productsRouter.delete('/:pid', deleteOne);

export default productsRouter;