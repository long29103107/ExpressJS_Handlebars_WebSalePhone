class LogoutController {
    async logout(req, res, next) {
        try {
            const token = req.cookies.token;

            if (token) {
                res.clearCookie('token');
            }

            res.redirect('/login');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new LogoutController();
