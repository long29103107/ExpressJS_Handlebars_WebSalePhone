const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');

const Product = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        rating_star: { type: Number, required: true, default: 0 },
        brand: { type: Schema.Types.Number, ref: 'Brand' },
    },
    {
        timestamps: true,
        collection: 'products',
    },
);

Product.plugin(mongoosePaginate);
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Product, 'Product');

module.exports = mongoose.model('Product', Product);
