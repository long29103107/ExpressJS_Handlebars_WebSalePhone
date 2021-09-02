const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const ImageProduct = new Schema(
    {
        name: { type: String, require: true },
        path: { type: String, require: true },
        type: { type: String, require: true },
        is_primary: { type: Boolean, require: true },
    },
    {
        timestamps: true,
    },
);

ImageProduct.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
autoIncrement.AutoIncrement(ImageProduct, 'ImageProduct');

module.exports = mongoose.model('ImageProduct', ImageProduct);
