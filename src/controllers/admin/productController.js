import Product from '../../models/Product';
import Joi from 'joi';
import { Op } from 'sequelize';
import renderPaginations from '../../utils/paginations';
import logger from '../../utils/logger';

export const listView = async (req, res) => {
    const search = req.query.search || '';
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const { rows: products, count: totalProducts } = await Product.findAndCountAll({
        attributes: ['id', 'thumb', 'title', 'categoryId', 'price', 'stock'],
        where: {
            title: {
                [Op.like]: `%${search}%`
            }
        },
        include: {
            association: 'category',
            attributes: ['title']
        },
        order: [['id', 'DESC']],
        limit,
        offset: (page - 1) * limit,
        raw: true
    });
    res.render('admin/product', {
        layout: 'layouts/admin',
        action: 'list',
        search,
        products,
        paginations: renderPaginations(Math.ceil(totalProducts / limit), page, res.locals.baseUrl + req.originalUrl)
    });
};

export const addView = (req, res) => {
    res.render('admin/product', {
        layout: 'layouts/admin',
        action: 'add'
    });
};

export const addProduct = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            title: Joi.string().required().label('Title'),
            slug: Joi.string().required().label('Slug'),
            description: Joi.string().required().label('Description'),
            brand: Joi.string().required().label('Brand'),
            categoryId: Joi.number()
                .required()
                .valid(...res.locals.categories.map((category) => category.id))
                .label('Category'),
            price: Joi.number().required().label('Price'),
            stock: Joi.number().required().min(0).label('Stock'),
            thumb: Joi.string().required().label('Thumb'),
            images: Joi.string().required().label('Images')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { title, slug, description, brand, categoryId, price, stock, thumb, images } = value;
        await Product.create({
            title,
            slug,
            description,
            brand,
            categoryId,
            price,
            stock,
            thumb,
            images: images
                .split('\n')
                .map((image) => image.trim())
                .filter((image) => image)
        });
        res.json({ status: 'success', message: 'Product added successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const editView = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt'] }, raw: true });
    res.render('admin/product', {
        layout: 'layouts/admin',
        action: 'edit',
        product
    });
};

export const editProduct = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            title: Joi.string().required().label('Title'),
            slug: Joi.string().required().label('Slug'),
            description: Joi.string().required().label('Description'),
            brand: Joi.string().required().label('Brand'),
            categoryId: Joi.number()
                .required()
                .valid(...res.locals.categories.map((category) => category.id))
                .label('Category'),
            price: Joi.number().required().label('Price'),
            stock: Joi.number().required().min(0).label('Stock'),
            thumb: Joi.string().required().label('Thumb'),
            images: Joi.string().required().label('Images')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const id = req.params.id;
        const product = await Product.findByPk(id, { attributes: ['id'] });
        if (!product) {
            return res.json({ status: 'error', message: 'Product not found!' });
        }
        const { title, slug, description, brand, categoryId, price, stock, thumb, images } = value;
        await product.update({
            title,
            slug,
            description,
            brand,
            categoryId,
            price,
            stock,
            thumb,
            images: images
                .split('\n')
                .map((image) => image.trim())
                .filter((image) => image)
        });
        res.json({ status: 'success', message: 'Product updated successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id, { attributes: ['id'] });
        if (!product) {
            return res.json({ status: 'error', message: 'Product not found!' });
        }
        await product.destroy();
        res.json({ status: 'success', message: 'Product deleted successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};
