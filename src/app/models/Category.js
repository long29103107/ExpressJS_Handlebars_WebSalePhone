const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Category = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, unique: true, required: true },
    },
    {
        timestamps: true,
    },
);

Category.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Category, 'Category');

module.exports = mongoose.model('Category', Category);
