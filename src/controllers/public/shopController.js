import Product from '../../models/Product';
import Category from '../../models/Category';
import { Op } from 'sequelize';

export const shopView = async (req, res) => {
    const category = req.query.category;
    const brand = req.query.brand;
    const price = req.query.price;
    const search = req.query.search;
    const sort = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const where = {};
    let title = 'Shop';
    if (category && category !== 'all') {
        const categoryData = await Category.findOne({
            where: {
                slug: category
            }
        });
        if (categoryData) {
            where.categoryId = categoryData.id;
            title = categoryData.title;
        }
    }
    if (brand && brand !== 'all') {
        where.brand = {
            [Op.like]: `%${brand}%`
        };
    }
    if (price && price !== 'all') {
        const priceRange = price.split('-');
        if (priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1])) {
            where.price = {
                [Op.between]: [priceRange[0], priceRange[1]]
            };
        }
    }
    if (search) {        
        where.title = {
            [Op.like]: `%${search}%`
        };
    }
    let order = [['createdAt', 'DESC']];
    if (sort === 'price-asc') {
        order = [['price', 'ASC']];
    } else if (sort === 'price-desc') {
        order = [['price', 'DESC']];
    } else if (sort === 'name-asc') {
        order = [['title', 'ASC']];
    } else if (sort === 'name-desc') {
        order = [['title', 'DESC']];
    }
    const products = await Product.findAll({
        attributes: ['id', 'title', 'slug', 'price', 'thumb', 'images'],
        where,
        order,
        limit,
        offset: (page - 1) * limit,
        raw: true
    });
    const totalProducts = await Product.count({
        where
    });
    const totalPages = Math.ceil(totalProducts / limit);
    res.render('public/shop', {
        layout: 'layouts/public',
        title,
        products,
        page,
        totalPages
    });
};
