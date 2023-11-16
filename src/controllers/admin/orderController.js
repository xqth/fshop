import Order from '../../models/Order';
import Product from '../../models/Product';
import Joi from 'joi';
import renderPaginations from '../../utils/paginations';

export const listView = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { rows: orders, count: totalOrders } = await Order.findAndCountAll({
        attributes: ['id', 'status', 'createdAt'],
        order: [['id', 'DESC']],
        limit,
        offset: (page - 1) * limit,
        include: [
            {
                association: 'user',
                attributes: ['email']
            },
            {
                association: 'payment',
                attributes: ['amount', 'method']
            }
        ]
    });
    res.render('admin/order', {
        layout: 'layouts/admin',
        action: 'list',
        orders,
        paginations: renderPaginations(Math.ceil(totalOrders / limit), page, res.locals.baseUrl + req.originalUrl)
    });
};

export const editView = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
        attributes: ['id', 'status', 'createdAt'],
        include: [
            {
                association: 'user',
                attributes: ['email']
            },
            {
                association: 'payment',
                attributes: ['amount', 'method']
            }
        ]
    });
    const products = await order.getProducts();
    products.forEach(product => {
        product.quantity = product.OrderItem.quantity;
        delete product.OrderItem;
    });
    res.render('admin/order', {
        layout: 'layouts/admin',
        action: 'edit',
        order,
        products
    });
};

export const editOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const schema = Joi.object({
            status: Joi.string().valid('pending', 'processing', 'completed', 'cancelled').required()
        });
        const { value, error } = schema.validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.message.replace(/"/g, '') + '!' });
        }
        const order = await Order.findByPk(id, { attributes: ['id'] });
        if (!order) {
            return res.json({ status: 'error', message: 'Order not found!' });
        }
        const { status } = value;
        await order.update({ status });
        res.json({ status: 'success', message: 'Order updated successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.findByPk(id, { attributes: ['id'] });
        if (!order) {
            return res.json({ status: 'error', message: 'Order not found!' });
        }
        await order.destroy();
        res.json({ status: 'success', message: 'Order deleted successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};
