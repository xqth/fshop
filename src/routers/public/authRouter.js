import { Router } from 'express';
import isUser from '../../middlewares/isUser';
import { loginView, loginUser, registerView, registerUser, logoutUser } from '../../controllers/public/authController';

const authRouter = Router();

authRouter.get('/login', isUser, loginView);
authRouter.post('/login', isUser, loginUser);
authRouter.get('/register', isUser, registerView);
authRouter.post('/register', isUser, registerUser);
authRouter.get('/logout', logoutUser);

export default authRouter;
