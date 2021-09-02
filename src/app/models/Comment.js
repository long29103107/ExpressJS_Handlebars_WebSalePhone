const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');
const mongooseDelete = require('mongoose-delete');

const Comment = new Schema(
    {
        user_id: { type: Number, require: true },
        product_id: { type: Number, require: true },
        comment_text: { type: String, require: true },
        parent_id: { type: Number, require: true },
    },
    {
        timestamps: true,
    },
);

Comment.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Comment, 'Comment');

module.exports = mongoose.model('Comment', Comment);
