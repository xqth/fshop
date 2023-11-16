import sequelize from '../config/sequelize';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    async changePassword(password) {
        this.password = User.hashPassword(password);
        this.passwordChangedAt = Date.now();
        await this.save();
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        passwordChangedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        }
    },
    {
        sequelize,
        underscored: true
    }
);

await User.sync();

export default User;
