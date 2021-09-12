const mongoose = require('mongoose');
const User = require('../models/User');
const IdentityCounter = require('../models/IdentityCounter');
class HomeController {
    index(req, res, next) {
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

        res.render('user/home', { layout: 'user' });
    }
}

module.exports = new HomeController();
