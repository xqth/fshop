const isUser = async (req, res, next) => {
    const isLogin = /^\/auth\/(login|register)$/.test(req.originalUrl);
    if (isLogin && req.user) {
        return res.redirect('/');
    }
    if (!isLogin && !req.user) {
        return res.redirect('/auth/login');
    }
    next();
};

export default isUser;
