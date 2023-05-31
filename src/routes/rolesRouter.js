import { Router } from 'express'
import { create, deleteOne, getAll, getOne, update } from '../controllers/rolesControllers.js';
import authorization from '../middlewares/authorization.js';

const rolesRouter = Router();

rolesRouter.get('/', authorization('admin'), getAll)
rolesRouter.get('/:pid', authorization('admin'), getOne);
rolesRouter.post('/', authorization('admin'), create);
rolesRouter.put('/:pid',  authorization('admin'), update);
rolesRouter.delete('/:pid', authorization('admin'), deleteOne);

export default rolesRouter;