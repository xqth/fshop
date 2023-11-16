import User from '../../models/User';
import Order from '../../models/Order';
import Joi from 'joi';

export const profileView = async (req, res) => {
    res.render('public/profile', {
        title: 'My profile',
        layout: 'layouts/public',
        user: res.locals.loggedInUser,
        orders: await Order.findAll({
            attributes: ['id', 'createdAt', 'status', 'totalPrice'],
            where: {
                userId: req.user.id
            },
            order: [['createdAt', 'DESC']]
        })
    });
};

export const editProfile = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            firstName: Joi.string().required().label('First name'),
            lastName: Joi.string().required().label('Last name'),
            address: Joi.string().required().label('Address'),
            phone: Joi.string().required().label('Phone'),
            password: Joi.string().optional().allow('').min(5).max(20).label('Password'),
            confirmPassword: Joi.string().optional().allow('').valid(Joi.ref('password')).messages({
                'any.only': 'Confirm password does not match'
            })
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { firstName, lastName, address, phone, password } = value;
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'firstName', 'lastName', 'address', 'phone', 'password']
        });
        user.firstName = firstName;
        user.lastName = lastName;
        user.address = address;
        user.phone = phone;
        await user.save();
        if (password) {
            await user.changePassword(password);
        }
        res.json({ status: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const orderView = async (req, res) => {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
        attributes: ['id', 'createdAt', 'status', 'totalPrice'],
        where: {
            userId: req.user.id
        }
    });
    if (!order) {
        return res.render('public/error', {
            layout: 'layouts/public',
            title: 'Error'
        });
    }
    const products = await order.getProducts({
        attributes: ['id', 'title', 'slug', 'price', 'thumb'],
        joinTableAttributes: ['quantity'],
        raw: true
    });
    products.forEach((product) => {
        product.quantity = product['OrderItem.quantity'];
        delete product['OrderItem.quantity'];
    });
    res.render('public/order', {
        title: 'Order details',
        layout: 'layouts/public',
        order,
        products
    });
};
