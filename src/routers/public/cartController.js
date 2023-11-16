import { Router } from 'express';
import isUser from '../../middlewares/isUser';
import {
    cartView,
    getCart,
    addProductToCart,
    updateCart,
    deleteFromCart
} from '../../controllers/public/cartController';

const cartRouter = Router();

cartRouter.get('/', isUser, cartView);
cartRouter.post('/data', isUser, getCart);
cartRouter.post('/', isUser, addProductToCart);
cartRouter.put('/', isUser, updateCart);
cartRouter.delete('/', isUser, deleteFromCart);

export default cartRouter;
