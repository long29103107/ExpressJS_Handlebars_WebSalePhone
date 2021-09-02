const mongoose = require('mongoose');
const User = require('../models/User');

class HomeController {
    index(req, res, next) {
        const user = new User({
            username: 'Long',
            email: 'long@gmail.com',
            password: '123',
            slug: 'long',
        });
        user.save(function (err) {
            if (err) {
                console.log('fail');
                // return handleError(err);
            }
            // saved!
        });

        res.render('user/home', { layout: 'user' });
    }
}

module.exports = new HomeController();
