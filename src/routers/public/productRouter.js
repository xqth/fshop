import { Router } from 'express';
import { productView } from '../../controllers/public/productController';

const productRouter = Router();

productRouter.get('/:slug', productView);

export default productRouter;
