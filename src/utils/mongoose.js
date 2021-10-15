module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    getSelectedOption: function (array, id) {
        return array.map((item) => {
            if (item._id == id) {
                item.selected = true;
            }
            return item;
        });
    },
};
