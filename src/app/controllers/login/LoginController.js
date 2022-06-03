const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const errorHandler = require('../../../utils/error');
const { check, validationResult } = require('express-validator');

class LoginController {
    async getLogin(req, res, next) {
        try {
            return res.render('login/login', {
                layout: 'login',
                title: 'Login',
                error: req.flash('error') ?? null,
                errors: req.flash('errors') ?? null,
                success: req.flash('success') ?? null,
            });
        } catch (error) {
            next(error);
        }
    }

    async postLogin(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.errors);
                return res.redirect('/login');
            }

            const { email, password } = req.body;

            const userNotActive = await User.findOne({ email, active: false });

            if (userNotActive) {
                req.flash('error', 'Account not activated');
                return res.redirect('/login');
            }

            const user = await User.findOne({ email, active: true }).populate(
                'role',
            );

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    { id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: process.env.TOKEN_EXPIRES_IN,
                    },
                );

                if (!token) {
                    const err = errorHandler.getError(404);
                    next(err);
                }

                res.cookie('token', token);

                if (user.role.name == 'admin') {
                    return res.redirect('/admin');
                }
                return res.redirect('/');
            }

            req.flash('error', 'Invalid account or password');
            return res.redirect('/login');
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = new LoginController();
