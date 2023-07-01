const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.set('strictQuery', false);

// Connect our Express server to MongoDB

const connectDB = () => {
    return mongoose.connect(config.db.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = connectDB;