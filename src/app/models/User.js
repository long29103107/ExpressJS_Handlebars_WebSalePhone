const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');

const User = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, default: null },
        user_image: { type: String, default: null },
        status: { type: Boolean, default: true },
        active: { type: Boolean, default: false },
        slug: { type: String, required: true },
        phone: { type: String, default: null },
        role: { type: Schema.Types.Number, ref: 'Role' },
    },
    {
        timestamps: true,
        collection: 'users',
    },
);

User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(User, 'User');

module.exports = mongoose.model('User', User);
