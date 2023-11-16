import User from '../../models/User';
import Joi from 'joi';
import { Op } from 'sequelize';
import renderPaginations from '../../utils/paginations';
import logger from '../../utils/logger';

export const listView = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { rows: users, count: totalUsers } = await User.findAndCountAll({
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'address', 'role'],
        where: {
            [Op.or]: {
                email: {
                    [Op.like]: `%${search}%`
                },
                firstName: {
                    [Op.like]: `%${search}%`
                },
                lastName: {
                    [Op.like]: `%${search}%`
                }
            }
        },
        order: [['id', 'DESC']],
        limit,
        offset: (page - 1) * limit,
        raw: true
    });
    res.render('admin/user', {
        layout: 'layouts/admin',
        action: 'list',
        search,
        users,
        paginations: renderPaginations(Math.ceil(totalUsers / limit), page, res.locals.baseUrl + req.originalUrl)
    });
};

export const addView = (req, res) => {
    res.render('admin/user', {
        layout: 'layouts/admin',
        action: 'add'
    });
};

export const addUser = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            email: Joi.string().email().required().label('Email'),
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            phone: Joi.string().required().label('Phone'),
            address: Joi.string().required().label('Address'),
            password: Joi.string().required().min(5).max(20).label('Password'),
            role: Joi.string().required().valid('user', 'admin').label('Role')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { email, firstName, lastName, phone, address, password, role } = value;
        const user = await User.findOne({ attributes: ['id'], where: { email }, raw: true });
        if (user) {
            return res.json({ status: 'error', message: 'Email already exists!' });
        }
        const newUser = await User.create({
            email,
            firstName,
            lastName,
            phone,
            address,
            password: User.hashPassword(password),
            role
        });
        await newUser.createCart();
        res.json({ status: 'success', message: 'User added successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const editView = async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id, {
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone', 'address', 'role'],
        raw: true
    });
    res.render('admin/user', {
        layout: 'layouts/admin',
        action: 'edit',
        user
    });
};

export const editUser = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            firstName: Joi.string().required().label('First name'),
            lastName: Joi.string().required().label('Last name'),
            phone: Joi.string().required().label('Phone'),
            address: Joi.string().required().label('Address'),
            password: Joi.string().optional().allow('').min(5).max(20).label('Password'),
            role: Joi.string().required().valid('user', 'admin').label('Role')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const id = req.params.id;
        const user = await User.findByPk(id, { attributes: ['id'] });
        if (!user) {
            return res.json({ status: 'error', message: 'User not found!' });
        }
        const { firstName, lastName, phone, address, password, role } = value;
        await user.update({ firstName, lastName, phone, address, role });
        if (password) {
            await user.changePassword(password);
        }
        res.json({ status: 'success', message: 'User updated successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id, { attributes: ['id'] });
        if (!user) {
            return res.json({ status: 'error', message: 'User not found!' });
        }
        await user.removeCart();
        await user.destroy();
        res.json({ status: 'success', message: 'User deleted successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};
