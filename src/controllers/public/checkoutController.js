import Order from '../../models/Order';
import Payment from '../../models/Payment';
import paypal from '../../config/paypal';
import logger from '../../utils/logger';
import OrderItem from '../../models/OrderItem';

export const checkoutView = async (req, res) => {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({
        attributes: ['title', 'price'],
        joinTableAttributes: ['quantity'],
        raw: true
    });
    products.forEach((product) => {
        product.quantity = product['CartItem.quantity'];
        delete product['CartItem.quantity'];
    });
    res.render('public/checkout', {
        layout: 'layouts/public',
        title: 'Checkout',
        user: res.locals.loggedInUser,
        cart,
        products
    });
};

export const checkout = async (req, res) => {
    try {
        const cart = await req.user.getCart();
        const products = await cart.getProducts({
            attributes: ['id', 'title', 'price'],
            joinTableAttributes: ['quantity'],
            raw: true
        });
        products.forEach((product) => {
            product.quantity = product['CartItem.quantity'];
            delete product['CartItem.quantity'];
        });
        if (products.length === 0) {
            return res.redirect(res.locals.baseUrl + '/cart');
        }
        const method = ['cash', 'paypal'].includes(req.body.method) ? req.body.method : 'cash';
        const order = await Order.create({
            userId: req.user.id,
            totalPrice: cart.totalPrice
        });
        await OrderItem.bulkCreate(
            products.map((product) => {
                return {
                    orderId: order.id,
                    productId: product.id,
                    quantity: product.quantity
                };
            })
        );
        await Payment.create({
            orderId: order.id,
            amount: cart.totalPrice,
            method
        });
        const totalPrice = cart.totalPrice;
        cart.setProducts([]);
        cart.totalPrice = 0;
        await cart.save();
        if (method === 'cash') {
            res.redirect(res.locals.baseUrl + '/profile/order/' + order.id);
        } else {
            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                redirect_urls: {
                    return_url: res.locals.baseUrl + '/checkout/success',
                    cancel_url: res.locals.baseUrl + '/profile/order'
                },
                transactions: [
                    {
                        item_list: {
                            items: products.map((product) => ({
                                name: product.title,
                                sku: product.id,
                                price: product.price,
                                currency: 'USD',
                                quantity: product.quantity
                            }))
                        },
                        amount: {
                            currency: 'USD',
                            total: totalPrice
                        },
                        description: 'FShop billing'
                    }
                ]
            };
            paypal.payment.create(create_payment_json, async function (error, payment) {
                if (error) {
                    res.render('public/error', {
                        layout: 'layouts/public',
                        title: 'Error'
                    });
                } else {
                    order.paypalId = payment.id;
                    await order.save();
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href);
                        }
                    }
                }
            });
        }
    } catch (error) {
        logger.error(error);
        res.render('public/error', {
            layout: 'layouts/public',
            title: 'Error'
        });
    }
};

export const checkoutSuccess = async (req, res) => {
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const order = await Order.findOne({
            where: {
                paypalId: paymentId
            }
        });
        if (!order) {
            return res.render('public/error', {
                layout: 'layouts/public',
                title: 'Error'
            });
        }
        const execute_payment_json = {
            payer_id: payerId,
            transactions: [
                {
                    amount: {
                        currency: 'USD',
                        total: order.totalPrice
                    }
                }
            ]
        };
        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                res.render('public/error', {
                    layout: 'layouts/public',
                    title: 'Error'
                });
            } else {
                order.status = 'processing';
                await order.save();
                await Payment.update(
                    {
                        status: 'paid'
                    },
                    {
                        where: {
                            orderId: order.id
                        }
                    }
                );
                res.redirect(res.locals.baseUrl + '/profile/order/' + order.id);
            }
        });
    } catch (error) {
        logger.error(error);
        res.render('public/error', {
            layout: 'layouts/public',
            title: 'Error'
        });
    }
};
