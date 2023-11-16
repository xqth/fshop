import { Router } from 'express';
import { listView, editView, editOrder, deleteOrder } from '../../controllers/admin/orderController';

const orderRouter = Router();

orderRouter.get('/', listView);
orderRouter.get('/:id(\\d+)', editView);
orderRouter.put('/:id(\\d+)', editOrder);
orderRouter.delete('/:id(\\d+)', deleteOrder);

export default orderRouter;
