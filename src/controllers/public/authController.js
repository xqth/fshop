import User from '../../models/User';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/app';
import logger from '../../utils/logger';

export const loginView = (req, res) => {
    res.render('public/login', { layout: false });
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
            where: { email }
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

export const registerView = (req, res) => {
    res.render('public/register', { layout: false });
};

export const registerUser = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            email: Joi.string().email().required().label('Email'),
            firstName: Joi.string().required().label('First name'),
            lastName: Joi.string().required().label('Last name'),
            phone: Joi.string().required().label('Phone'),
            address: Joi.string().required().label('Address'),
            password: Joi.string().required().min(5).max(20).label('Password'),
            confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
                'any.only': 'Confirm password does not match'
            })
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { email, firstName, lastName, phone, address, password } = value;
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
            password: User.hashPassword(password)
        });
        await newUser.createCart();
        const token = jwt.sign({ id: newUser.id, passwordChangedAt: newUser.passwordChangedAt }, SECRET_KEY, {
            expiresIn: '30d'
        });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.json({ status: 'success', message: 'Created new account successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
