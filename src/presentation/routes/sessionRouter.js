import { Router } from 'express'
import auth from '../middlewares/auth.js';
import { current, login, logout, signup } from '../controllers/sessionControllers.js';


const sessionRouter = Router();

sessionRouter.post('/login', login)
sessionRouter.post('/logout', auth, logout)
sessionRouter.post('/signup', signup)
sessionRouter.get('/current', auth, current);


export default sessionRouter;