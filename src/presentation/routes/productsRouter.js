import { Router } from 'express'
import { create, deleteOne, getAll, getOne, update } from '../controllers/productsControllers.js';
import authorization from '../middlewares/authorization.js';

const productsRouter = Router();

productsRouter.get('/', getAll)
productsRouter.get('/:pid', authorization('admin'), getOne);
productsRouter.post('/', authorization('admin'), create);
productsRouter.put('/:pid', authorization('admin'), update);
productsRouter.delete('/:pid', authorization('admin'), deleteOne);

export default productsRouter;