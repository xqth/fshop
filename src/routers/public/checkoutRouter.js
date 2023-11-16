import { Router } from 'express';
import isUser from '../../middlewares/isUser';
import { checkoutView, checkout, checkoutSuccess } from '../../controllers/public/checkoutController';

const checkoutRouter = Router();

checkoutRouter.get('/', isUser, checkoutView);
checkoutRouter.post('/', isUser, checkout);
checkoutRouter.get('/success', isUser, checkoutSuccess);

export default checkoutRouter;
