const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const OrderDetail = new Schema(
    {
        city_id: { type: Number, require: true },
        product_detail_id: { type: Number, require: true },
        quantity: { type: Number, require: true },
        price: { type: Number, require: true },
    },
    {
        timestamps: true,
    },
);

OrderDetail.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(OrderDetail, 'OrderDetail');

module.exports = mongoose.model('OrderDetail', OrderDetail);
