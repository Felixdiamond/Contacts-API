const mongoose = require("mongoose");


connectDb = async () => {
    try {
       const connection = await mongoose.connect(process.env.CONNECTION_STRING);
       console.log("Database connected successfully!", connection.connection.host, connection.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDb;