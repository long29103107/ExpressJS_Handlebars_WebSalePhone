const Model = require('../../app/models/Category');
const connectionSeeder = require('./ConnectionSeeder');

module.exports = async () => {
    connectionSeeder.connect();

    Model.deleteMany({}, function () {
        // console.log('Delete data success !!');
    });

    let data = [
        new Model({
            name: 'Điện thoại',
            slug: 'dien-thoai',
        }),
        new Model({
            name: 'Lap top',
            slug: 'lap-top',
        }),
        new Model({
            name: 'Ipad',
            slug: 'ipad',
        }),
    ];

    let count = 0;
    for (let i = 0; i < data.length; i++) {
        await data[i].save(function (err, result) {
            count++;
            if (count >= data.length) {
                connectionSeeder.exit();
            }
        });
    }
    // console.log("Add data success !!");
};
