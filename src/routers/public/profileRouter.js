import { Router } from 'express';
import isUser from '../../middlewares/isUser';
import { profileView, editProfile, orderView } from '../../controllers/public/profileController';

const profileRouter = Router();

profileRouter.get('/', isUser, profileView);
profileRouter.put('/', isUser, editProfile);
profileRouter.get('/order/:id(\\d+)', isUser, orderView);

export default profileRouter;
