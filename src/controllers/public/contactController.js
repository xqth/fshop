export const contactView = (req, res) => {
    res.render('public/contact', {
        layout: 'layouts/public',
        title: 'Contact'
    });
};
