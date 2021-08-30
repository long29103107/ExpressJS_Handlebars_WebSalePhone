const homeRouter = require('./user/home');
const dashboardRouter = require('./admin/dashboard');

function route(app) {
    app.use('/', homeRouter);

    app.use('/admin', dashboardRouter);
}

module.exports = route;
