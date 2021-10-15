const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Role = require('../../models/Role');
const shortid = require('shortid');
const slug = require('slug');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const path = require('path');
const errorHandler = require('../../../utils/error');

class RegisterController {
    async getRegister(req, res, next) {
        try {
            //    console.log(path.join(__dirname, '../../../public/user/img/logo.png'));
            res.render('login/register', {
                layout: 'login',
                title: 'Sign up',
                error: req.flash('error') ?? null,
                errors: req.flash('errors') ?? null,
                success: req.flash('success') ?? null,
            });
        } catch (error) {
            next(error);
        }
    }
    async postRegister(req, res, next) {
        try {
            if (req.body.password) {
                console.log(req.body.password);
                await check('confirm_password')
                    .equals(req.body.password)
                    .withMessage('Confirm password is not equal to password')
                    .run(req);
            }

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                req.flash('errors', errors.errors);
                return res.redirect('/signup');
            }

            const { email, username, password } = req.body;
            const slugName = slug(req.body.username) + '-' + shortid.generate();
            const hashedPwd = await bcrypt.hash(password, 10);

            const oldUser = await User.findOne({ email });

            if (oldUser) {
                req.flash('error', 'User Already Exist. Please Login!');
                return res.redirect('/signup');
            }
            const user = new User({
                email: email,
                username: username,
                password: hashedPwd,
                slug: slugName,
            });

            const role = await Role.findOne({ name: 'user' });

            if (role) {
                user.role = role._id;
            }

            await user.save((err, newUser) => {
                if (err) {
                    return next(err);
                }
                const token = jwt.sign(
                    { id: newUser._id },
                    process.env.TOKEN_VERIFY_ACCOUNT_KEY,
                    { expiresIn: '60m' },
                );

                let transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    secure: true,
                    auth: {
                        user: process.env.MAIL_USERNAME,
                        pass: process.env.MAIL_PASSWORD,
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });

                let content = '';
                content += `
                <div style="padding: 10px; background-color: #003375; font-family: Nunito !important; ">
                    <div style="padding: 30px 60px; background-color: #e0e0e0;">
                        <div style="background-color: white; padding: 15px;">
                            <div style="padding: 0 0 15px 0; text-align: center;">
                                <a style="display: inline-block; " href="${process.env.HOST_URL}"><img src="cid:unique@nodemailer.com" alt="Logo"></a>
                            </div>
                            <h2 style="text-align:center">Just more one step ... </h2>
                            <h4 style="text-align:center;">Hi ${username}, welcome to ${process.env.APP_NAME} store. Click the big button below to your ${process.env.APP_NAME} account.</h4>
                            <div style="padding: 15px 0 30px 0;">
                                <center>
                                    <a href="${process.env.HOST_URL}/signup/verify/${token}" style="padding: 15px;
                                        border-radius: 10px;
                                        font-size: 20px;
                                        background: #8ec1ee;
                                        color: white;
                                        border-color: #8ec1ee;
                                        text-decoration: none;">Activate account</a>  
                                </center>
                            </div>
                        </div>
                        <p style="text-align:center;">@2021  ${process.env.APP_NAME}. All rights reserved</p>
                    </div>
                </div>
                `;

                let mainOptions = {
                    from: `"Ustora" <${process.env.MAIL_USERNAME}>`,
                    to: email,
                    subject: 'Active account',
                    text: 'Activate your account to use many of our services',
                    html: content,
                    attachments: [
                        {
                            filename: 'logo.png',
                            path: path.join(
                                __dirname,
                                '../../../public/user/img/logo.png',
                            ),
                            cid: 'unique@nodemailer.com',
                        },
                    ],
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        req.flash('error', 'Email sending failed');
                        return res.redirect('/signup');
                    }
                });

                req.flash('success', 'Create account success !');
                res.redirect('/signup');
            });
        } catch (error) {
            next(error);
        }
    }

    async verifyActivateAccount(req, res, next) {
        try {
            const token = req.params.token;
            if (!token) {
                let error = errorHandler.getError(404);
                return next(err);
            }
            jwt.verify(
                token,
                process.env.TOKEN_VERIFY_ACCOUNT_KEY,
                (err, decoded) => {
                    if (err) {
                        let error = errorHandler.getError(404);
                        return next(error);
                    }

                    const idUser = decoded.id;

                    User.updateOne(
                        { _id: idUser },
                        { active: true },
                        (err, user) => {
                            if (err) {
                                next(err);
                            }
                            req.flash(
                                'success',
                                'Successful verify. You can login',
                            );
                            return res.redirect('/login');
                        },
                    );

                    next();
                },
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RegisterController();
