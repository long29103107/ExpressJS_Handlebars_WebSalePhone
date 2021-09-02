const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Tag = new Schema(
    {
        slug: { type: String, require: true, unique: true },
        type: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

Tag.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Tag, 'Tag');

module.exports = mongoose.model('Tag', Tag);
