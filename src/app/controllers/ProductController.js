class ProductController {
    index(req, res, next) {
        res.render('user/detail', { layout: 'user' });
    }
}

module.exports = new ProductController();
