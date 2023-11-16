import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        brand: DataTypes.STRING,
        price: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        thumb: DataTypes.STRING,
        images: {
            type: DataTypes.JSON,
            defaultValue: []
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        underscored: true
    }
);

await Product.sync();

export default Product;
