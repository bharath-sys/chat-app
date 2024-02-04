// import mongoose from "mongoose";
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected to ${conn.connection.host}`.blue.bold);
    } catch (error) {
        console.log('Error : ' + error);
        process.exit();
    }
}

module.exports = connectDB;