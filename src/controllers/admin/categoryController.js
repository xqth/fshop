import Category from '../../models/Category';
import Joi from 'joi';
import { Op } from 'sequelize';
import renderPaginations from '../../utils/paginations';
import logger from '../../utils/logger';

export const listView = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { rows: categories, count: totalCategories } = await Category.findAndCountAll({
        attributes: ['id', 'title', 'slug'],
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        },
        order: [['id', 'DESC']],
        limit,
        offset: (page - 1) * limit,
        raw: true
    });
    res.render('admin/category', {
        layout: 'layouts/admin',
        action: 'list',
        search,
        categories,
        paginations: renderPaginations(Math.ceil(totalCategories / limit), page, res.locals.baseUrl + req.originalUrl)
    });
};

export const addView = (req, res) => {
    res.render('admin/category', {
        layout: 'layouts/admin',
        action: 'add'
    });
};

export const addCategory = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            title: Joi.string().required().label('Title'),
            slug: Joi.string().required().label('Slug'),
            description: Joi.string().required().label('Description')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.message.replace(/"/g, '') + '!' });
        }
        const { title, slug, description } = value;
        await Category.create({ title, slug, description });
        res.json({ status: 'success', message: 'Category added successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const editView = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findByPk(id, { attributes: ['id', 'title', 'slug', 'description'] });
    res.render('admin/category', {
        layout: 'layouts/admin',
        action: 'edit',
        category
    });
};

export const editCategory = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            title: Joi.string().required().label('Title'),
            slug: Joi.string().required().label('Slug'),
            description: Joi.string().required().label('Description')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.message.replace(/"/g, '') + '!' });
        }
        const id = req.params.id;
        const category = await Category.findByPk(id, { attributes: ['id'] });
        if (!category) {
            return res.json({ status: 'error', message: 'Category not found!' });
        }
        const { title, slug, description } = value;
        await category.update({ title, slug, description });
        res.json({ status: 'success', message: 'Category updated successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id, { attributes: ['id'] });
        if (!category) {
            return res.json({ status: 'error', message: 'Category not found!' });
        }
        await category.destroy();
        res.json({ status: 'success', message: 'Category deleted successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};
