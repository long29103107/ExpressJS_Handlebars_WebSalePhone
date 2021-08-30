class HomeController {
    index(req, res, next) {
        res.render('user/home');
    }
}

module.exports = new HomeController();
