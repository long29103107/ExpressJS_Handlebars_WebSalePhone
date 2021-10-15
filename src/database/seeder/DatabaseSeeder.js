require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const async = require('async');
const faker = require('faker');
const slug = require('slug');
const IdentityCounter = require('../../app/models/IdentityCounter');
const Category = require('../../app/models/Category');
const CategoryProduct = require('../../app/models/CategoryProduct');
const User = require('../../app/models/User');
const Brand = require('../../app/models/Brand');
const Product = require('../../app/models/Product');
const Role = require('../../app/models/Role');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
};

const connection = mongoose.connect(process.env.DB_URL, options);

let list = [
    {
        model: 'Role',
        data: [
            {
                name: 'user',
            },
            {
                name: 'admin',
            },
        ],
    },
    {
        model: 'User',
        data: [
            {
                username: 'nguyenhoanglong',
                email: 'long@gmail.com',
                password: bcrypt.hashSync('12345678', 8),
                slug: 'nguyen-hoang-long',
                phone: '0342343234',
                active: true,
                role: 0,
            },
            {
                username: 'huynhthithuyvuong',
                email: 'vuong@gmail.com',
                password: bcrypt.hashSync('12345678', 8),
                slug: 'huynh-thi-thuy-vuong',
                phone: '0342343234',
                active: true,
                role: 1,
            },
            {
                username: 'nguyentanphuc',
                email: 'phuc@gmail.com',
                password: bcrypt.hashSync('12345678', 8),
                slug: 'nguyen-tan-phuc',
                phone: '0342343234',
                active: true,
                role: 1,
            },
        ],
    },
    {
        model: 'Brand',
        data: [
            {
                name: 'Xiaomi',
            },
            {
                name: 'Vivo',
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
    {
        model: 'Product',
        data: [
            {
                brand: 0,
                name: 'Điện thoại Xiaomi Mi 11 Lite',
                price: 7090000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Xiaomi Mi 11 Lite'),
            },
            {
                brand: 0,
                name: 'Điện thoại Xiaomi Redmi Note 10 Pro ',
                price: 7090000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Xiaomi Redmi Note 10 Pro '),
            },
            {
                brand: 0,
                name: 'Điện thoại Xiaomi Redmi Note 10S',
                price: 6090000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Xiaomi Redmi Note 10S'),
            },
            {
                brand: 0,
                name: 'Điện thoại Xiaomi Redmi Note 10 5G 4GB',
                price: 4990000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Xiaomi Redmi Note 10 5G 4GB'),
            },
            {
                brand: 1,
                name: 'Điện thoại Vivo V20 (2021)',
                price: 7790000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Vivo V20 (2021)'),
            },
            {
                brand: 1,
                name: 'Điện thoại Vivo Y72 5G',
                price: 7590000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Vivo Y72 5G'),
            },
            {
                brand: 1,
                name: 'Điện thoại Vivo Y53s',
                price: 6990000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Vivo Y53s'),
            },
            {
                brand: 1,
                name: 'Điện thoại Vivo V20 SE',
                price: 6490000,
                description: faker.commerce.productDescription(),
                slug: slug('Điện thoại Vivo V20 SE'),
            },
            {
                brand: 2,
                name: 'Samsung Galaxy S21 5G',
                price: 13990000,
                description: faker.commerce.productDescription(),
                slug: slug('Samsung Galaxy S21 5G'),
            },
            {
                brand: 2,
                name: 'Samsung Galaxy A02',
                price: 2590000,
                description: faker.commerce.productDescription(),
                slug: slug('Samsung Galaxy A02'),
            },
            {
                brand: 2,
                name: 'Samsung Galaxy A02s (3GB/32GB)',
                price: 2890000,
                description: faker.commerce.productDescription(),
                slug: slug('Samsung Galaxy A02s (3GB/32GB)'),
            },
            {
                brand: 2,
                name: 'Samsung Galaxy A12 (4GB/128GB)',
                price: 4290000,
                description: faker.commerce.productDescription(),
                slug: slug('Samsung Galaxy A12 (4GB/128GB)'),
            },
            {
                brand: 3,
                name: 'iPhone 12',
                price: 20490000,
                description: faker.commerce.productDescription(),
                slug: slug('iPhone 12'),
            },
            {
                brand: 3,
                name: 'iPhone 11',
                price: 14990000,
                description: faker.commerce.productDescription(),
                slug: slug('iPhone 11'),
            },
            {
                brand: 3,
                name: 'iPhone 12 Pro Max',
                price: 30990000,
                description: faker.commerce.productDescription(),
                slug: slug('iPhone 12 Pro Max'),
            },
            {
                brand: 3,
                name: 'iPhone 12 Pro',
                price: 27990000,
                description: faker.commerce.productDescription(),
                slug: slug('iPhone 12 Pro'),
            },
        ],
    },
    {
        model: 'CategoryProduct',
        data: [
            {
                category_id: 1,
                product_id: 0,
            },
            {
                category_id: 1,
                product_id: 1,
            },
            {
                category_id: 1,
                product_id: 2,
            },
            {
                category_id: 1,
                product_id: 3,
            },
            {
                category_id: 1,
                product_id: 4,
            },
            {
                category_id: 1,
                product_id: 5,
            },
            {
                category_id: 1,
                product_id: 6,
            },
            {
                category_id: 1,
                product_id: 7,
            },
            {
                category_id: 1,
                product_id: 8,
            },
            {
                category_id: 1,
                product_id: 9,
            },
            {
                category_id: 1,
                product_id: 10,
            },
            {
                category_id: 1,
                product_id: 11,
            },
            {
                category_id: 1,
                product_id: 12,
            },
            {
                category_id: 1,
                product_id: 13,
            },
            {
                category_id: 1,
                product_id: 14,
            },
            {
                category_id: 1,
                product_id: 15,
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
