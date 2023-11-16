import Product from '../../models/Product';

export const homeView = async (req, res) => {
    const [latestProducts, popularProducts] = await Promise.all([
        await Product.findAll({
            attributes: ['id', 'title', 'slug', 'price', 'thumb', 'images'],
            limit: 12,
            order: [['id', 'DESC']],
            raw: true
        }),
        await Product.findAll({
            attributes: ['id', 'title', 'slug', 'price', 'thumb', 'images'],
            limit: 8,
            order: [['views', 'DESC']],
            raw: true
        })
    ]);
    res.render('public/home', {
        layout: 'layouts/public',
        title: 'Home',
        latestProducts,
        popularProducts
    });
};
