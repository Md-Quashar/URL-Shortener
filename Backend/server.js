import connectDB from './db.js'
import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import shortUrlRoutes from './routes/short_url_routes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://localhost:5173','https://url-shortener-v42j.onrender.com']
}))


app.use('/user',userRoutes)
app.use('/', shortUrlRoutes)

app.listen(3000,()=>{
     connectDB()
    console.log("server running at port 3000")
})