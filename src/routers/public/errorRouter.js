import { Router } from 'express';
import { errorView } from '../../controllers/public/errorController';

const errorRouter = Router();

errorRouter.all('/*', errorView);

export default errorRouter;
