import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import loanRoutes from './routes/loanRoutes.js'
const app = express()
dotenv.config()



app.use(express.json())
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URI,
}))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.status(200).send({
      messsage: "welcome to Backend",
    });
  });


app.use('/api/auth',authRoutes)
app.use('/api/loans', loanRoutes);

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).send({
    sucess:false,
    statusCode: statusCode,
    message: message
})})

  
const PORT =process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is sucessfully running on ${PORT}`)
})


mongoose.connect(process.env.MONGODB_URI)
.then(
  console.log('db is sucessfully connected')
)
.catch((error)=>{
  console.error({
    message:"failed to connect to DB",
    error:error.message
})
})

