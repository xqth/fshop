import Category from '../models/Category';
import Product from '../models/Product';
import User from '../models/User';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Payment from '../models/Payment';

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { as: 'cart', foreignKey: 'userId' });

Cart.belongsToMany(Product, { through: CartItem, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartItem, foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { as: 'order', foreignKey: 'userId' });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

Order.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Order.hasOne(Payment, { as: 'payment', foreignKey: 'orderId' });