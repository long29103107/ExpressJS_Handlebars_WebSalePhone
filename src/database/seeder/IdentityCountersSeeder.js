const MongoClient = require('mongodb').MongoClient;

module.exports = {
    restartIndexCollection: async function () {
        MongoClient.connect(process.env.DB_URL, function (err, client) {
            if (err) throw err;

            const db = client.db(process.env.DB_NAME);
            db.listCollections().forEach(function (item) {
                db.collection(item.name).drop({}, function (err) {
                    client.close();
                });
            });
        });
    },
};

let list = [
    {
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
    },
    {
        model: 'Brand',
        data: [
            {
                name: 'Nokia',
            },
            {
                name: 'Canon',
            },
            {
                name: 'Samsung',
            },
            {
                name: 'Apple',
            },
        ],
    },
    {
        model: 'Category',
        data: [
            {
                name: 'Lap top',
                slug: 'lap-top',
            },
            {
                name: 'Điện thoại',
                slug: 'dien-thoai',
            },
            {
                name: 'Ipad',
                slug: 'ipad',
            },
        ],
    },
];

list = list.map(function (item) {
    return function (callback) {
        mongoose.model(item.model).create(item.data, callback);
    };
});

async.parallel(list, function (err, results) {
    mongoose.disconnect();
});
