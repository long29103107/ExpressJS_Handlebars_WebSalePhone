const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        // console.log("success");
    } catch (error) {
        // console.log("fail");
    }
}
module.exports = { connect };
