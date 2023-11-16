import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';

class OrderItem extends Model {}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    },
    {
        sequelize,
        underscored: true
    }
);

await OrderItem.sync();

export default OrderItem;
