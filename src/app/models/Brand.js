const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Brand = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

Brand.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Brand, 'Brand');

module.exports = mongoose.model('Brand', Brand);
