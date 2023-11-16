import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';
import OrderItem from './OrderItem';
import Payment from './Payment';

class Order extends Model {}

Order.init(
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
        },
        status: {
            type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
            defaultValue: 'pending'
        },
        paypalId: DataTypes.STRING
    },
    {
        sequelize,
        underscored: true,
        hooks: {
            async beforeDestroy(order) {
                await OrderItem.destroy({ where: { orderId: order.id } });
                await Payment.destroy({ where: { orderId: order.id } });
            }
        }
    }
);

await Order.sync();

export default Order;
