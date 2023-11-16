import User from '../../models/User';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/app';
import logger from '../../utils/logger';

export const loginView = (req, res) => {
    res.render('admin/login', { layout: false });
};

export const loginUser = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            email: Joi.string().email().required().label('Email'),
            password: Joi.string().required().label('Password')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { email, password } = value;
        const user = await User.findOne({
            attributes: ['id', 'password', 'passwordChangedAt'],
            where: { email, role: 'admin' }
        });
        if (!user || !user.validatePassword(password)) {
            return res.json({ status: 'error', message: 'Invalid email or password!' });
        }
        const token = jwt.sign({ id: user.id, passwordChangedAt: user.passwordChangedAt }, SECRET_KEY, {
            expiresIn: '30d'
        });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.json({ status: 'success', message: 'User logged in successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/auth/login');
};
