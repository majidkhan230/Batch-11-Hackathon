import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
const app = express()
dotenv.config()



app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.get("/", (req, res) => {
    res.status(200).send({
      messsage: "welcome to Backend",
    });
  });
  
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

