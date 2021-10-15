const slug = require('slug');
const Product = require('../app/models/Product');

module.exports = {
    getSlugName: async (title, Model) => {
        let slugName = slug(title);
        const countProduct = await Model.count({
            slug: { $regex: '.*' + slugName + '.*' },
        }).exec();

        if (countProduct == 0) {
            return slugName;
        }

        return slugName + '-' + (countProduct + 1);
    },
};
