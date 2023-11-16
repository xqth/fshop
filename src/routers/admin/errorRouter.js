import { Router } from 'express';
import { renderError } from '../../controllers/admin/errorController';

const errorRouter = Router();

errorRouter.all('/*', renderError);

export default errorRouter;
