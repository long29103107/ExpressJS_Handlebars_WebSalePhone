const Product = require('../../models/Product');
const Brand = require('../../models/Brand');
const toolParseObject = require('../../../utils/mongoose');
const patinate = require('../../../utils/patination');
const helper = require('../../../utils/helper');
const errorHelper = require('../../../utils/error');
const { check, validationResult } = require('express-validator');
const shortid = require('shortid');
const slug = require('slug');

class ProductController {
    async index(req, res, next) {
        try {
            const page = req.query.page ?? 1;
            const limit = 10;
            const sort = req.query.sort ?? null;

            if (req.query.page < 1) {
                res.redirect(req.baseUrl);
            }
            const query = Product.find({});

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

            const listProduct = await query
                .populate('brand')
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .lean()
                .exec();

            const countProduct = await Product.count({});

            const [products, itemCount] = await Promise.all([
                listProduct,
                countProduct,
            ]);

            const pageCount = patinate.getPageCount(itemCount, limit);

            if (req.query.page > pageCount) {
                res.redirect(req.baseUrl);
            }

            const { pageItem, previousHref, nextHref } = patinate.getPageItem(
                page,
                pageCount,
                req.query,
            );
            // res.json({page: pageItem});
            res.render('admin/product/index', {
                products,
                pagination: {
                    itemCount: itemCount,
                    pageCount: pageCount,
                    currentPage: page,
                    pageItem: pageItem,
                    previousHref: previousHref,
                    nextHref: nextHref,
                },
                isManageProduct: true,
                isProduct: true,
                sort,
                breadcrumbs: [
                    {
                        title: 'Home',
                        href: '/admin',
                    },
                    {
                        title: 'Product',
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
            const brands = await Brand.find({}).lean().exec();

            const [listBrand] = await Promise.all([brands]);

            res.render('admin/product/createOrEdit', {
                listBrand,
                isManageProduct: true,
                isProduct: true,
                breadcrumbs: [
                    {
                        title: 'Home',
                        href: '/admin',
                    },
                    {
                        title: 'Product',
                        href: '/admin/product',
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.errors);
                return res.redirect('/admin/product/create');
            }

            const formData = req.body;
            formData.slug = slug(formData.name) + '-' + shortid.generate();

            const product = new Product(formData);
            await product.save();

            req.flash('success', 'Save product success !');
            res.redirect('/admin/product');
        } catch (error) {
            next(error);
        }
    }

    async edit(req, res, next) {
        try {
            if (!req.params.id) {
                req.flash('error', 'Product not found');
                res.redirect('/admin/product');
                return;
            }
            let promiseProduct;

            if (isNaN(parseInt(req.params.id))) {
                req.flash('error', 'Product not found');
                res.redirect('/admin/product');
                return;
            } else {
                promiseProduct = await Product.findOne({ _id: req.params.id })
                    .populate('brand')
                    .lean()
                    .exec();

                if (!promiseProduct) {
                    req.flash('error', 'Product not found');
                    res.redirect('/admin/product');
                    return;
                }
            }

            const promiseBrands = await Brand.find({}).lean().exec();

            let [listBrand, product] = await Promise.all([
                promiseBrands,
                promiseProduct,
            ]);

            listBrand = toolParseObject.getSelectedOption(
                listBrand,
                product.brand._id,
            );

            res.render('admin/product/createOrEdit', {
                listBrand,
                product,
                isManageProduct: true,
                isProduct: true,
                breadcrumbs: [
                    {
                        title: 'Home',
                        href: '/admin',
                    },
                    {
                        title: 'Product',
                        href: '/admin/product',
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
            //Check product item
            if (!req.params.id) {
                req.flash('error', 'Product not found');
                return res.redirect('/admin/product');
            }
            let product;

            if (isNaN(parseInt(req.params.id))) {
                req.flash('error', 'Product not found');
                return res.redirect('/admin/product');
            } else {
                product = await Product.findOne({ _id: req.params.id })
                    .populate('brand')
                    .lean()
                    .exec();

                if (!product) {
                    req.flash('error', 'Product not found');
                    return res.redirect('/admin/product');
                }
            }

            //Check form request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.errors);
                return res.redirect(`/admin/product/edit/${req.params.id}`);
            }

            const formData = req.body;
            formData.slug = slug(formData.name) + '-' + shortid.generate();

            await Product.updateOne({ _id: req.params.id }, formData);

            req.flash('success', 'Save product success !');
            return res.redirect('/admin/product');
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

module.exports = new ProductController();
