import { Router } from 'express'
import auth from '../middlewares/auth.js';
import { create, deleteOne, getAll, getOne, update } from '../controllers/usersControllers.js';

const usersRouter = Router();

usersRouter.get('/', auth, getAll)
usersRouter.get('/:email', auth, getOne);
usersRouter.post('/', auth, create);
usersRouter.put('/:uid', auth, update);
usersRouter.delete('/:uid', auth, deleteOne);

export default usersRouter;