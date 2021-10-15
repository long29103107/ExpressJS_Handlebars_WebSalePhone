const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const autoIncrement = require('../../utils/mongoose-auto-increment');

const Role = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
        collection: 'roles',
    },
);

Role.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
autoIncrement.AutoIncrement(Role, 'Role');

module.exports = mongoose.model('Role', Role);
