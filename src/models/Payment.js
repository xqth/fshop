import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';

class Payment extends Model {}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orderId: DataTypes.INTEGER,
        amount: DataTypes.FLOAT,
        method: {
            type: DataTypes.ENUM('cash', 'paypal'),
            defaultValue: 'cash'
        },
        status: {
            type: DataTypes.ENUM('unpaid', 'paid'),
            defaultValue: 'unpaid'
        }
    },
    {
        sequelize,
        underscored: true
    }
);

await Payment.sync();

export default Payment;
