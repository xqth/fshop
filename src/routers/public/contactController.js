import { Router } from 'express';
import { contactView } from '../../controllers/public/contactController';

const contactRouter = Router();

contactRouter.all('/', contactView);

export default contactRouter;
