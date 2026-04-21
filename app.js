const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB()





const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})) // enables url encoding of data and directly acsess them via request body

app.use('/api/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1: ${PORT}`)
})
