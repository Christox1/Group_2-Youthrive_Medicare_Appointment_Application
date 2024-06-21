import express, { json } from 'express'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './backend.js/routes/authRoutes.js'
import userRoutes from './backend.js/routes/userRoutes.js'
import doctorRoutes from './backend.js/routes/doctorRoutes.js'
import appointmentRoutes from './backend.js/routes/appointmentRoutes.js' 
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import logger from 'morgan'
import cloudinary from 'cloudinary'

const app = express()
app.use(bodyParser.json())
dotenv.config();
app.use(bodyParser.json())
const corOptions = {
    origin: true,
}

const PORT = process.env.PORT || 8000
app.use(logger("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corOptions))

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_Key,
    api_secret: process.env.API_Secret,
  });

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/doctor', doctorRoutes)
app.use('/api/appointments', appointmentRoutes);

connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB is connected..."))

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
