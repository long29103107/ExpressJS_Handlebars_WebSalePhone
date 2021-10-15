const mongoose = require('mongoose');

class ForgotPasswordController {
    getForgotPassword(req, res, next) {
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

        res.render('login/forgot-password', {
            layout: 'login',
            title: 'Forgot password',
        });
    }
}

module.exports = new ForgotPasswordController();
