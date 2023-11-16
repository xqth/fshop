import { Router } from 'express';
import dashboardRouter from './dashboardRouter';
import authRouter from './authRouter';
import categoryRouter from './categoryRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';
import orderRouter from './orderRouter';
import errorRouter from './errorRouter';

const adminRouter = Router();

adminRouter.use('/', dashboardRouter);
adminRouter.use('/auth', authRouter);
adminRouter.use('/categories', categoryRouter);
adminRouter.use('/products', productRouter);
adminRouter.use('/users', userRouter);
adminRouter.use('/orders', orderRouter);
adminRouter.use('/*', errorRouter);

export default adminRouter;
