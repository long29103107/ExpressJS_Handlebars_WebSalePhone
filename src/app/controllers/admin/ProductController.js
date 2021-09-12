const Product = require('../../models/Product');
const Brand = require('../../models/Brand');
const toolParseObject = require('../../../utils/mongoose');
const slug = require('slug');

class ProductController {
    async index(req, res, next) {
        const products = await Product.find({})
            .populate('brand')
            .then((listProduct) =>
                toolParseObject.mutipleMongooseToObject(listProduct),
            )
            .catch(next);
        // res.json(products);

        const data = {
            listProduct: products,
            breadcrumbs: [
                {
                    title: 'Home',
                    href: './',
                },
                {
                    title: 'Product',
                    // 'href': './',
                },
            ],
        };

        // const test = new Brand({
        //         name: 'Test',
        //     });

        //     test.save(function(err){
        //     if(err) return console.error(err.stack)

        //     console.log("test company is added")

        //     // Samsung now exists, so lets create a Product
        //     const product = new Product({
        //         name: 'product 1',
        //         price: 2000000,
        //         description: 'Samsung now exists, so lets create a Product',
        //         slug: slug('Samsung now exists, so lets create a Product'),
        //         brand: test._id
        //     });

        //     product.save(function(err){
        //         if(err) return console.error(err.stack)
        //         console.log("product is added")
        //     });
        // });

        res.render('admin/product/index', {
            data,
            layout: 'admin',
        });
    }
}

module.exports = new ProductController();
