export const errorView = (req, res) => {
    res.render('public/error', {
        layout: 'layouts/public',
        title: 'Error'
    });
};
