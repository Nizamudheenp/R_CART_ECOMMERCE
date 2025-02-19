const express = require('express')
const app = express()
require('dotenv').config()
const userRoute = require('./src/routes/userRoutes')
const productRoute = require('./src/routes/productRoutes')
const cors = require('cors')

const connectDB = require('./src/config/db')
connectDB()

app.use(cors({
    origin: process.env.FRONDEND_URL,
    credentials:true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders:['content-Type', 'Authorization']
    
}))

app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/user/product', productRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}`); 
})