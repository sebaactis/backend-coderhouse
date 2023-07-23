import { Router } from 'express'
import authToken from '../middlewares/authToken.js';
import { changePassword, forgotPassword, updatePassword } from '../controllers/passwordController.js';


const passwordRouter = Router();

passwordRouter.post('/forgotPassword', forgotPassword);
passwordRouter.get('/updatePassword', updatePassword);
passwordRouter.post('/changePassword', authToken, changePassword);


export default passwordRouter;