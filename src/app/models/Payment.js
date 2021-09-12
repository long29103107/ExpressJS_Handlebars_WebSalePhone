const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Payment = new Schema(
    {
        order_id: { type: Number, require: true },
        fee_id: { type: Number, require: true },
        amount: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: 'payments',
    },
);

Payment.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Payment, 'Payment');

module.exports = mongoose.model('Payment', Payment);
