const mongoose = require('mongoose');


const db =async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect("mongodb+srv://izzahscollection:izzahscollection@cluster0.cqpgq6a.mongodb.net/barcodedb")
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;