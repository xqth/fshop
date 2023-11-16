import Product from '../../models/Product';
import Joi from 'joi';
import logger from '../../utils/logger';

export const cartView = async (req, res) => {
    const cart = (await req.user.getCart()) || (await req.user.createCart());
    const products = await cart.getProducts({
        attributes: ['id', 'title', 'slug', 'price', 'thumb'],
        joinTableAttributes: ['quantity'],
        raw: true
    });
    products.forEach((product) => {
        product.quantity = product['CartItem.quantity'];
        delete product['CartItem.quantity'];
    });
    res.render('public/cart', { layout: 'layouts/public', title: 'Your cart', cart, products });
};

export const getCart = async (req, res) => {
    try {
        const cart = (await req.user.getCart()) || (await req.user.createCart());
        const products = await cart.getProducts({
            attributes: ['id', 'title', 'slug', 'price', 'thumb'],
            joinTableAttributes: ['quantity'],
            raw: true
        });
        products.forEach((product) => {
            product.quantity = product['CartItem.quantity'];
            delete product['CartItem.quantity'];
        });
        res.json({
            status: 'success',
            message: 'Cart fetched successfully!',
            data: {
                cart: {
                    totalPrice: cart.totalPrice
                },
                products
            }
        });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            productId: Joi.number().required().label('Product ID'),
            quantity: Joi.number().min(1).required().label('Quantity')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { productId, quantity } = value;
        const product = await Product.findByPk(productId, { attributes: ['id', 'price'] });
        if (!product) {
            return res.json({ status: 'error', message: 'Product not found!' });
        }
        const cart = (await req.user.getCart()) || (await req.user.createCart());
        const [cartProduct] = await cart.getProducts({ where: { id: productId }, attributes: ['id'] });
        if (cartProduct) {
            await cartProduct.CartItem.increment('quantity', { by: quantity });
        } else {
            await cart.addProduct(product, { through: { quantity } });
        }
        cart.totalPrice += product.price * quantity;
        await cart.save();
        res.json({ status: 'success', message: 'Product added to cart successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            productId: Joi.number().required().label('Product ID'),
            quantity: Joi.number().min(1).required().label('Quantity')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { productId, quantity } = value;
        const cart = (await req.user.getCart()) || (await req.user.createCart());
        const [cartProduct] = await cart.getProducts({ where: { id: productId }, attributes: ['id', 'price'] });
        if (!cartProduct) {
            return res.json({ status: 'error', message: 'Product not found in you cart!' });
        }
        const prevQuantity = cartProduct.CartItem.quantity;
        cartProduct.CartItem.quantity = quantity;
        cart.totalPrice += cartProduct.price * (quantity - prevQuantity);
        await Promise.all([cartProduct.CartItem.save(), cart.save()]);
        res.json({ status: 'success', message: 'Cart updated successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};

export const deleteFromCart = async (req, res) => {
    try {
        const { value, error } = Joi.object({
            productId: Joi.number().required().label('Product ID')
        }).validate(req.body);
        if (error) {
            return res.json({ status: 'error', message: error.details[0].message.replace(/"/g, '') + '!' });
        }
        const { productId } = value;
        const cart = (await req.user.getCart()) || (await req.user.createCart());
        const [cartProduct] = await cart.getProducts({ where: { id: productId }, attributes: ['id', 'price'] });
        if (!cartProduct) {
            return res.json({ status: 'error', message: 'Product not found in your cart!' });
        }
        cart.totalPrice -= cartProduct.price * cartProduct.CartItem.quantity;
        await Promise.all([cartProduct.CartItem.destroy(), cart.save()]);
        res.json({ status: 'success', message: 'Product deleted from cart successfully!' });
    } catch (error) {
        logger.error(error);
        res.json({ status: 'error', message: 'Something went wrong, please try again later!' });
    }
};
