const isAdmin = async (req, res, next) => {
    const isLogin = /^\/admin\/auth\/login$/.test(req.originalUrl);
    const isAdminLoggedIn = req.user && req.user.role === 'admin';
    if (isLogin && isAdminLoggedIn) {
        return res.redirect('/admin');
    }
    if (!isLogin && !isAdminLoggedIn) {
        return res.redirect('/admin/auth/login');
    }
    next();
};

export default isAdmin;
