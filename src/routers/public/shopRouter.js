import { Router } from 'express';
import { shopView } from '../../controllers/public/shopController';

const shopRouter = Router();

shopRouter.get('/', shopView);

export default shopRouter;
