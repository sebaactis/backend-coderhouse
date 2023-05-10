import { Router } from 'express'
import auth from '../middlewares/auth.js';
import { login, logout, signup } from '../controllers/sessionControllers.js';

const sessionRouter = Router();

sessionRouter.post('/login', login)
sessionRouter.post('/logout', auth, logout)
sessionRouter.post('/signup', signup)


export default sessionRouter;