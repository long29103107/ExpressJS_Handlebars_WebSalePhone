const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');

const Rate = new Schema(
    {
        comment_id: { type: Number, required: true },
        count_star: { type: Number, required: true },
    },
    {
        timestamps: true,
    },
);

Rate.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Rate, 'Rate');

module.exports = mongoose.model('Rate', Rate);
