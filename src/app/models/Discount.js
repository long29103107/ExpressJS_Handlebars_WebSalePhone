const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Discount = new Schema(
    {
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        discount_code: { type: String, required: true },
        sale_percent: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: 'discounts',
    },
);

Discount.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Discount, 'Discount');

module.exports = mongoose.model('Discount', Discount);
