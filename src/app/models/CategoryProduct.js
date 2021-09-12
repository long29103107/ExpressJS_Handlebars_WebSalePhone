const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const CategoryProduct = new Schema(
    {
        category_id: { type: Number, required: true },
        product_id: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: 'category_products',
    },
);

CategoryProduct.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
autoIncrement.AutoIncrement(CategoryProduct, 'CategoryProduct');

module.exports = mongoose.model('CategoryProduct', CategoryProduct);
