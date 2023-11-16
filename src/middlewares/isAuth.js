import User from '../models/User';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/app';

const getUserFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({
            where: { id: decoded.id }
        });
        if (!user || user.passwordChangedAt.getTime() > Date.parse(decoded.passwordChangedAt)) {
            return null;
        }
        user.name = `${user.firstName} ${user.lastName}`;
        return user;
    } catch {
        return null;
    }
};

const isAuth = async (req, res, next) => {
    const user = await getUserFromToken(req.cookies.token);
    req.user = user;
    res.locals.loggedInUser = user
        ? {
              ...user.toJSON(),
              name: user.name
          }
        : null;
    next();
};

export default isAuth;
