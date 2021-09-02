const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Attribute = new Schema(
    {
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

Attribute.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Attribute, 'Attribute');

module.exports = mongoose.model('Attribute', Attribute);
