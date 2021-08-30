const User = require('../../models/User');
class DashboardController {
    index(req, res, next) {
        // User.find({}, function(err, users){
        //     if(!err) res.json(users);
        //     res.status(400).json({error: 'ERROR!!!!'});
        // });
        res.render('admin/dashboard', { layout: 'admin' });
    }
}

module.exports = new DashboardController();
