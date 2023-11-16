import Product from '../../models/Product';
import Category from '../../models/Category';
import Order from '../../models/Order';
import User from '../../models/User';

export const dashboardPage = async (req, res) => {
    const data = await Promise.all([Product.count(), Category.count(), Order.count(), User.count()]);
    res.render('admin/dashboard', {
        layout: 'layouts/admin',
        data
    });
};
