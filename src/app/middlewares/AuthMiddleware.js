const jwt = require('jsonwebtoken');
const error = require('../../utils/error');

class AuthMiddleWare {
    verifyToken = (req, res, next) => {
        try {
            const token = req.cookies.token;

            if (!token) {
                req.flash('info', 'Session has expired');
                return res.redirect('/login');
            }

            jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
                if (err) {
                    // res.json({err: err});
                    req.flash('info', 'Session has expired');
                    return res.clearCookie('token').redirect('/login');
                }
                next();
            });
        } catch (error) {
            next(error);
        }
    };
    isLogged = (req, res, next) => {
        try {
            const token = req.cookies.token;

            if (token) {
                return res.redirect('/');
            }
            next();
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthMiddleWare();
