const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');

const ProductTag = new Schema(
    {
        product_id: { type: Number, required: true },
        tag_id: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: 'product_tags',
    },
);

ProductTag.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(ProductTag, 'ProductTag');

module.exports = mongoose.model('ProductTag', ProductTag);
