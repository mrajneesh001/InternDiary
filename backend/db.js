const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const mongoURI = process.env.mongoURI

const connectToMongo = async ()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

module.exports = connectToMongo;