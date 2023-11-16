import { Router } from 'express';
import {
    listView,
    addView,
    addProduct,
    editView,
    editProduct,
    deleteProduct
} from '../../controllers/admin/productController';

const productRouter = Router();

productRouter.get('/', listView);
productRouter.get('/add', addView);
productRouter.post('/add', addProduct);
productRouter.get('/:id(\\d+)', editView);
productRouter.put('/:id(\\d+)', editProduct);
productRouter.delete('/:id(\\d+)', deleteProduct);

export default productRouter;
