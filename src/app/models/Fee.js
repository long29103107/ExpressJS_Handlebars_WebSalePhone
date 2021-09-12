const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Fee = new Schema(
    {
        city_id: { type: Number, require: true },
        fee: { type: Number, require: true },
    },
    {
        timestamps: true,
        collection: 'users',
    },
);

Fee.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Fee, 'Fee');

module.exports = mongoose.model('Fee', Fee);
