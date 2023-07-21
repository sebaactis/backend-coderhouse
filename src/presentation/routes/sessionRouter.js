import { Router } from 'express'
import auth from '../middlewares/auth.js';
import authToken from '../middlewares/authToken.js';
import { changePassword, current, forgotPassword, login, logout, signup, updatePassword } from '../controllers/sessionControllers.js';


const sessionRouter = Router();

sessionRouter.post('/login', login)
sessionRouter.post('/logout', auth, logout)
sessionRouter.post('/signup', signup)
sessionRouter.get('/current', auth, current);
sessionRouter.post('/forgotPassword', forgotPassword);
sessionRouter.get('/updatePassword', updatePassword);
sessionRouter.post('/changePassword', changePassword);


export default sessionRouter;