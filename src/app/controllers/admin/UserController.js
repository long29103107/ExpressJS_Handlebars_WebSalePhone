const Product = require('../../models/Product');
const Brand = require('../../models/Brand');
const toolParseObject = require('../../../utils/mongoose');
const patinate = require('../../../utils/patination');
const helper = require('../../../utils/helper');
const errorHelper = require('../../../utils/error');
const { check, validationResult } = require('express-validator');
const shortid = require('shortid');
const slug = require('slug');
const User = require('../../models/User');
const Role = require('../../models/Role');

class UserController {
    async index(req, res, next) {
        try {
            const page = req.query.page ?? 1;
            const limit = 10;
            const sort = req.query.sort ?? null;

            if (req.query.page < 1) {
                res.redirect(req.baseUrl);
            }
            const query = User.find({});

            switch (sort) {
                case 'za':
                    query.sort({ name: 'desc' });
                    break;
                case 'az':
                    query.sort({ name: 'asc' });
                    break;
                case 'desc':
                    query.sort({ price: 'desc' });
                    break;
                case 'asc':
                    query.sort({ price: 'asc' });
                    break;
                case 'last':
                    query.sort({ createdAt: 'desc' });
                    break;
            }

            const listUser = await query
                .populate('role')
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .lean()
                .exec();

            const countUser = await User.count({});

            const [users, itemCount] = await Promise.all([listUser, countUser]);

            const pageCount = patinate.getPageCount(itemCount, limit);

            if (req.query.page > pageCount) {
                res.redirect(req.baseUrl);
            }

            const { pageItem, previousHref, nextHref } = patinate.getPageItem(
                page,
                pageCount,
                req.query,
            );

            res.render('admin/user/index', {
                users,
                pagination: {
                    itemCount: itemCount,
                    pageCount: pageCount,
                    currentPage: page,
                    pageItem: pageItem,
                    previousHref: previousHref,
                    nextHref: nextHref,
                },
                isManageUser: true,
                isUser: true,
                sort,
                breadcrumbs: [
                    {
                        title: 'Home',
                        href: '/admin',
                    },
                    {
                        title: 'User',
                        // 'href': './',
                    },
                ],
                success: req.flash('success') ?? null,
                error: req.flash('error') ?? null,
                layout: 'admin',
            });
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const roles = await Role.find({}).lean().exec();

            const [listRole] = await Promise.all([roles]);

            res.render('admin/user/createOrEdit', {
                listRole,
                isManageUser: true,
                isUser: true,
                breadcrumbs: [
                    {
                        title: 'Home',
                        href: '/admin',
                    },
                    {
                        title: 'User',
                        href: '/admin/user  ',
                    },
                    {
                        title: 'Create',
                        // 'href': './',
                    },
                ],
                success: req.flash('success') ?? null,
                errors: req.flash('errors') ?? null,
                error: req.flash('error') ?? null,
                layout: 'admin',
            });
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        try {
            // console.log(req.body.username);
            // console.log(req.body.username == 'long');
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.errors);
                return res.redirect('/admin/user/create');
            }

            const userCheck = await User.findOne({ email: req.body.email });

            if (userCheck) {
                req.flash('error', 'Email already in use');
                return res.redirect('/admin/user/create');
            }

            const formData = req.body;
            formData.slug = slug(formData.username) + '-' + shortid.generate();

            const user = new User(formData);
            await user.save((err, user) => {
                if (err) {
                    return next(err);
                }

                req.flash('success', 'Save user success !');
                return res.redirect('/admin/user');
            });
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            if (!req.params.id) {
                req.flash('error', 'User not found');
                return res.redirect('/admin/user');
            }
            let promiseUser;

            if (isNaN(parseInt(req.params.id))) {
                req.flash('error', 'User not found');
                return res.redirect('/admin/user');
            } else {
                promiseUser = await User.findOne({ _id: req.params.id })
                    .populate('role')
                    .lean()
                    .exec();

                if (!promiseUser) {
                    req.flash('error', 'User not found');
                    return res.redirect('/admin/user');
                }
            }

            const promiseRole = await Role.find({}).lean().exec();

            let [listRole, user] = await Promise.all([
                promiseRole,
                promiseUser,
            ]);

            listRole = toolParseObject.getSelectedOption(
                listRole,
                user.role._id,
            );

            res.render('admin/user/createOrEdit', {
                listRole,
                user,
                isManageUser: true,
                isUser: true,
                breadcrumbs: [
                    {
                        title: 'Home',
                        href: '/admin',
                    },
                    {
                        title: 'User',
                        href: '/admin/user',
                    },
                    {
                        title: 'Edit',
                        // 'href': './',
                    },
                ],
                success: req.flash('success') ?? null,
                errors: req.flash('errors') ?? null,
                error: req.flash('error') ?? null,
                layout: 'admin',
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            // return res.json({res: req.body});
            //Check product item
            if (!req.params.id) {
                req.flash('error', 'User not found');
                return res.redirect('/admin/user');
            }
            let user;

            if (isNaN(parseInt(req.params.id))) {
                req.flash('error', 'User not found');
                return res.redirect('/admin/user');
            } else {
                user = await User.findOne({ _id: req.params.id })
                    .populate('role')
                    .lean()
                    .exec();

                if (!user) {
                    req.flash('error', 'User not found');
                    return res.redirect('/admin/user');
                }
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.errors);
                res.redirect(`/admin/user/edit/${req.params.id}`);
            }

            const formData = req.body;
            formData.slug = slug(formData.username) + '-' + shortid.generate();

            await User.updateOne(
                { _id: req.params.id },
                formData,
                (err, user) => {
                    if (err) {
                        return next(err);
                    }

                    req.flash('success', 'Save user success !');
                    res.redirect('/admin/user');
                },
            );
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const listId = req.body.listId.split(',') ?? [];
            await Product.delete({ _id: listId });

            req.flash('success', 'Delete product success !');
            res.redirect('/admin/product');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
