import express from 'express';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import isAuth from './middlewares/isAuth';
import isAdmin from './middlewares/isAdmin';
import adminRouter from './routers/admin';
import publicRouter from './routers/public';
import Category from './models/Category';
import { ROOT_DIR } from './config/app';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', `${ROOT_DIR}/src/views`);

app.use(expressLayouts);
app.use(express.static(`${ROOT_DIR}/public`));

app.use(async (req, res, next) => {
    res.locals.baseUrl = req.protocol + '://' + req.get('host');
    res.locals.adminUrl = res.locals.baseUrl + '/admin';
    res.locals.categories = await Category.findAll({
        attributes: ['id', 'title', 'slug'],
        order: [['title', 'ASC']],
        raw: true
    });
    next();
});

app.use(isAuth);

app.use('/admin', isAdmin, adminRouter);
app.use(publicRouter);

export default app;
