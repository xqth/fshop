import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';
import CartItem from './CartItem';

class Cart extends Model {}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: DataTypes.INTEGER,
        totalPrice: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    },
    {
        sequelize,
        underscored: true,
        hooks: {
            async beforeDestroy(cart) {
                await CartItem.destroy({ where: { cartId: cart.id } });
            }
        }
    }
);

await Cart.sync();

export default Cart;
