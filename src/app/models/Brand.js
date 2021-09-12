const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Brand = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String, require: true, default: null },
        products: [{ type: Schema.Types.Number, ref: 'Product' }],
    },
    {
        timestamps: true,
        collection: 'brands',
    },
);

Brand.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Brand, 'Brand');

module.exports = mongoose.model('Brand', Brand);
