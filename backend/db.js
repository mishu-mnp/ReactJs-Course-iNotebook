// importing mongoose
const mongoose = require('mongoose');

// creating mongoURI we get it from MongoDB Compass
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

// func to connect mongo with node
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to MongoDb Succeccfully!")
    })
}

// exporting func connectToMongo so that we can use it in another files
module.exports = connectToMongo