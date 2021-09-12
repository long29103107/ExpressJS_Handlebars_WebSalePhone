const User = require('../../app/models/User');

module.exports = {
    getData: async function () {
        let data = {
            model: 'User',
            data: [
                {
                    fullname: 'Nguyễn Hoàng Long',
                    email: 'long@gmail.com',
                    password: passwordHash.generate('12345678'),
                    slug: 'nguyen-hoang-long',
                },
                {
                    fullname: 'Huỳnh Thị Thuỳ Vương',
                    email: 'vuong@gmail.com',
                    password: passwordHash.generate('12345678'),
                    slug: 'huynh-thi-thuy-vuong',
                },
                {
                    fullname: 'Nguyễn Tấn Phúc',
                    email: 'phuc@gmail.com',
                    password: passwordHash.generate('12345678'),
                    slug: 'nguyen-tan-phuc',
                },
            ],
        };
        return data;
    },
};
