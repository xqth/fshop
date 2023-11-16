import Product from '../../models/Product';
import { Op, fn } from 'sequelize';

export const productView = async (req, res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({
        where: { slug },
        attributes: ['id', 'title', 'price', 'thumb', 'images', 'description', 'brand'],
        include: {
            association: 'category',
            attributes: ['title']
        },
        raw: true
    });
    if (!product) {
        return res.render('public/error', { layout: 'layouts/public', title: 'Product not found' });
    }
    const [relatedProducts] = await Promise.all([
        Product.findAll({
            attributes: ['id', 'title', 'thumb', 'price', 'slug'],
            where: {
                id: { [Op.ne]: product.id }
            },
            order: [fn('RAND', product.id)],
            limit: 8,
            raw: true
        }),
        Product.increment(
            { views: 1 },
            {
                where: {
                    slug: req.params.slug
                }
            }
        )
    ]);
    res.render('public/product', {
        layout: 'layouts/public',
        title: product.title,
        product,
        relatedProducts
    });
};
