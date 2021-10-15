const homeRouter = require('./user/home');
const dashboardRouter = require('./admin/dashboard');
const productAdminRouter = require('./admin/product');
const loginRouter = require('./login/login');
const logoutRouter = require('./login/logout');
const registerRouter = require('./login/register');
const forgotPassworRouter = require('./login/forgot-password');
const authorization = require('../app/middlewares/AuthorizationMiddleware');
const authentication = require('../app/middlewares/AuthMiddleware');
const userAdminRouter = require('./admin/user');

function route(app) {
    app.use('/', homeRouter);

    app.use('/logout', logoutRouter);

    app.use('/login', authentication.isLogged, loginRouter);

    app.use('/signup', authentication.isLogged, registerRouter);

    app.use('/forgot-password', authentication.isLogged, forgotPassworRouter);

    app.use(
        '/admin',
        [authentication.verifyToken, authorization.isAdmin],
        dashboardRouter,
    );

    app.use(
        '/admin/product',
        [authentication.verifyToken, authorization.isAdmin],
        productAdminRouter,
    );

    app.use(
        '/admin/user',
        [authentication.verifyToken, authorization.isAdmin],
        userAdminRouter,
    );

    app.get('*', function (req, res) {
        res.render('error/404', {
            layout: 'error',
            title: 'Page not found',
            code: 404,
            content: 'The page you are looking not found.',
        });
    });
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;

        switch (statusCode) {
            case 403:
                res.render('error/403', {
                    layout: 'error',
                    title: 'Forbidden',
                    code: 403,
                    content: 'You are unauthorized to see this page.',
                });
                break;
            case 500:
                res.render('error/500', {
                    layout: 'error',
                    title: 'System Error',
                    code: 500,
                    content:
                        'The website is currently unaivailable. Try again later or contact the developer.',
                });
                break;
            default:
                res.render('error/404', {
                    layout: 'error',
                    title: 'Page not found',
                    code: 404,
                    content: 'The page you are looking not found.',
                });
        }
    });
}

module.exports = route;
