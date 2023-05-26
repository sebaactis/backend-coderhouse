import { Router } from 'express'
import { create, deleteOne, getAll, getOne, update } from '../controllers/rolesControllers.js';

const rolesRouter = Router();

rolesRouter.get('/', getAll)
rolesRouter.get('/:pid', getOne);
rolesRouter.post('/', create);
rolesRouter.put('/:pid', update);
rolesRouter.delete('/:pid', deleteOne);

export default rolesRouter;