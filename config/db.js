//db.js establishes the connection using mongoose 
const mongoose = require('mongoose')



const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)

        mongoose.connection.on('error', err => {
            console.error(`MongoDB connection error: ${err}`)
            
        })

        mongoose.connection.on('disconnected', ()=> {
            console.warn(`MongoDB connection lost. attempting to reconnect...`)
            
        })


    }catch(err){

        console.error(`Error connecting to MongoDB: ${err.message}`)
        process.exit(1)
    }
}

module.exports = connectDB