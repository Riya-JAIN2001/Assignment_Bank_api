const mongoose = require('mongoose');

module.exports = async function dbConnect() {
    await mongoose.connect(String(process.env.MONGO_URL));
    console.log("connected");
};
