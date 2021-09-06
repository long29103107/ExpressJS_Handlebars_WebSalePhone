const Model = require('../../app/models/User');
const passwordHash = require('password-hash');
const mongoose = require('mongoose');
const connectionSeeder = require('./ConnectionSeeder');

module.exports = async () => {
    connectionSeeder.connect();

    Model.deleteMany({}, function () {
        // console.log('Delete data success !!');
    });

    let data = [
        new Model({
            fullname: 'Nguyễn Hoàng Long',
            email: 'long@gmail.com',
            password: passwordHash.generate('12345678'),
            slug: 'nguyen-hoang-long',
        }),
        new Model({
            fullname: 'Huỳnh Thị Thuỳ Vương',
            email: 'vuong@gmail.com',
            password: passwordHash.generate('12345678'),
            slug: 'huynh-thi-thuy-vuong',
        }),
        new Model({
            fullname: 'Nguyễn Tấn Phúc',
            email: 'phuc@gmail.com',
            password: passwordHash.generate('12345678'),
            slug: 'nguyen-tan-phuc',
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
};
