const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Product = new Schema(
    {
        brand_id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        rating_star: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    },
);

Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Product, 'Product');

module.exports = mongoose.model('Product', Product);
