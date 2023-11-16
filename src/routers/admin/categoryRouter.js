import { Router } from 'express';
import {
    listView,
    addView,
    addCategory,
    editView,
    editCategory,
    deleteCategory
} from '../../controllers/admin/categoryController';

const categoryRouter = Router();

categoryRouter.get('/', listView);
categoryRouter.get('/add', addView);
categoryRouter.post('/add', addCategory);
categoryRouter.get('/:id(\\d+)', editView);
categoryRouter.put('/:id(\\d+)', editCategory);
categoryRouter.delete('/:id(\\d+)', deleteCategory);

export default categoryRouter;
