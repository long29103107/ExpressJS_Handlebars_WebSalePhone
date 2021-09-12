const homeRouter = require('./user/home');
const dashboardRouter = require('./admin/dashboard');
const productAdminRouter = require('./admin/product');

function route(app) {
    app.use('/', homeRouter);

    app.use('/admin', dashboardRouter);

    app.use('/admin/product', productAdminRouter);
}

module.exports = route;
