import { Router } from 'express';
import { listView, addView, addUser, editView, editUser, deleteUser } from '../../controllers/admin/userController';

const userRouter = Router();

userRouter.get('/', listView);
userRouter.get('/add', addView);
userRouter.post('/add', addUser);
userRouter.get('/:id(\\d+)', editView);
userRouter.put('/:id(\\d+)', editUser);
userRouter.delete('/:id(\\d+)', deleteUser);

export default userRouter;
