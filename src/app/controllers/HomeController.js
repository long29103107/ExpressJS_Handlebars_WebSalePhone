const mongoose = require('mongoose');
const User = require('../models/User');
const IdentityCounter = require('../models/IdentityCounter');
const jwt = require('jsonwebtoken');
class HomeController {
    async index(req, res, next) {
        try {
            // const decode = jwt.verify(req.cookies.token, config.secret);
            // const user = await User.findOne({_id: decode.id});
            // console.log(user);

            res.render('user/home', { layout: 'user' });
        } catch (error) {
            next(error);
        }
        // const user = new User({
        //     username: 'Long',
        //     email: 'long@gmail.com',
        //     password: '123',
        //     slug: 'long',
        // });
        // user.save(function (err) {
        //     if (err) {
        //         console.log('fail');
        //         // return handleError(err);
        //     }
        //     // saved!
        // });
        // const user = User.find({}).exec();
        // console.log(user);

        // res.json(user);
    }
}

module.exports = new HomeController();
