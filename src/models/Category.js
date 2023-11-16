import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';

class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        slug: DataTypes.STRING,
        description: DataTypes.TEXT
    },
    {
        sequelize,
        underscored: true
    }
);

await Category.sync();

export default Category;
