import { Router } from 'express'
import auth from '../middlewares/auth.js';
import authToken from '../middlewares/authToken.js';
import { current, forgotPassword, login, logout, signup } from '../controllers/sessionControllers.js';

const sessionRouter = Router();

sessionRouter.post('/login', login)
sessionRouter.post('/logout', auth, logout)
sessionRouter.post('/signup', signup)
sessionRouter.get('/current', authToken, current);
sessionRouter.post('/forgotPassword', forgotPassword);


export default sessionRouter;