import { Router } from 'express';
import { loginView, loginUser, logoutUser } from '../../controllers/admin/authController';

const authRouter = Router();

authRouter.get('/login', loginView);
authRouter.post('/login', loginUser);
authRouter.get('/logout', logoutUser);

export default authRouter;
