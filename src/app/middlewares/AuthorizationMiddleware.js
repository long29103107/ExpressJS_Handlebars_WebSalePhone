const jwt = require('jsonwebtoken');
const User = require('../../app/models/User');
const fs = require('fs');
const publicKey = fs.readFileSync('./key/publickey.crt');
const error = require('../../utils/error');

class AuthorizationMiddleware {
    isAdmin = async (req, res, next) => {
        try {
            let token = req.cookies.token;

            if (!token) {
                req.flash('info', 'Your session has expired !');
                return res.redirect('/login');
            }

            let dataDecode = jwt.verify(token, process.env.TOKEN_KEY);
            let idUser = dataDecode.id;

            const user = await User.findOne({ _id: idUser })
                .populate('role')
                .exec();

            if (!user) {
                const err = error.getError(404);
                next(err);
            }

            if (user.role.name == 'admin') {
                next();
            } else {
                const err = error.getError(403);
                next(err);
            }
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthorizationMiddleware();
