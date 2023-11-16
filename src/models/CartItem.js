import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';

class CartItem extends Model {}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cartId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    },
    {
        sequelize,
        underscored: true
    }
);

await CartItem.sync();

export default CartItem;
