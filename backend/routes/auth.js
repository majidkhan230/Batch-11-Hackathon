import express from 'express'
import authController from '../controllers/authController.js'
import upload from '../config/multer.js'

const authRoutes = express.Router()

authRoutes.post('/register', upload.single("file") ,authController.register)
authRoutes.post('/login', authController.login)
authRoutes.post('/google-login', authController.GoogleLogin)
authRoutes.get('/logout', authController.logout)

export default authRoutes