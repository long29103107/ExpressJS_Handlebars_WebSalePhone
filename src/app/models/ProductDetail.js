const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const ProductDetail = new Schema(
    {
        attribute_detail_id: { type: Number, required: true },
        product_id: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

ProductDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
autoIncrement.AutoIncrement(ProductDetail, 'ProductDetail');

module.exports = mongoose.model('ProductDetail', ProductDetail);
