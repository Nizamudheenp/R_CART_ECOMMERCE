const mongoose = require('mongoose')
require('dotenv').config()


const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI) 
        console.log('database connection successful');
        
    } catch (error) {
       console.log('database connection failed');
        
    }
}

module.exports = connectDB

