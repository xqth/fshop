import { Router } from 'express';
import homeRouter from './homeRouter';
import shopRouter from './shopRouter';
import authRouter from './authRouter';
import profileRouter from './profileRouter';
import productRouter from './productRouter';
import cartRouter from './cartController';
import checkoutRouter from './checkoutRouter';
import contactRouter from './contactController';
import errorRouter from './errorRouter';

const publicRouter = Router();

publicRouter.use('/', homeRouter);
publicRouter.use('/shop', shopRouter);
publicRouter.use('/auth', authRouter);
publicRouter.use('/profile', profileRouter);
publicRouter.use('/products', productRouter);
publicRouter.use('/cart', cartRouter);
publicRouter.use('/checkout', checkoutRouter);
publicRouter.use('/contact-us', contactRouter);
publicRouter.use('/*', errorRouter);

export default publicRouter;
