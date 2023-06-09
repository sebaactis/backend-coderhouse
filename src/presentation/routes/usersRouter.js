import { Router } from 'express'
import authorization from '../middlewares/authorization.js';
import { create, deleteOne, getAll, getOne, update } from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.get('/', authorization('admin'),  getAll)
usersRouter.get('/:email', authorization('admin'), getOne);
usersRouter.post('/', authorization('admin'),  create);
usersRouter.put('/:email', authorization('admin'),  update);
usersRouter.delete('/:email', authorization('admin'),  deleteOne);

export default usersRouter;