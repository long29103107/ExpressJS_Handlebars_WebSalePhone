const User = require('../../models/User');
class DashboardController {
    async index(req, res, next) {
        try {
            res.render('admin/dashboard/index', {
                isDashboard: true,
                layout: 'admin',
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DashboardController();
