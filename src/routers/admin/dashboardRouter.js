import { Router } from 'express';
import { dashboardPage } from '../../controllers/admin/dashboardController';

const dashboardRouter = Router();

dashboardRouter.get('/', dashboardPage);

export default dashboardRouter;
