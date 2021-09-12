const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const AttributeDetail = new Schema(
    {
        type_id: { type: Number, required: true },
        name: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'attribute_details',
    },
);

AttributeDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
autoIncrement.AutoIncrement(AttributeDetail, 'AttributeDetail');

module.exports = mongoose.model('AttributeDetail', AttributeDetail);
