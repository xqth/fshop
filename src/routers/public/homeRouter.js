import { Router } from 'express';
import { homeView } from '../../controllers/public/homeController';

const homeRouter = Router();

homeRouter.get('/', homeView);

export default homeRouter;
