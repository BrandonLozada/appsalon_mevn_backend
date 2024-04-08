import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'

// Environment variables.
dotenv.config()

// Configure the app.
const app = express()

// read received data through body request.
app.use(express.json())

// Connect to DB.
db()

// Configure CORS
// TODO: Remove the "undefined" item from whiteList array.
const whiteList = process.argv[2] === '--postman' ? [process.env.FRONTEND_URL, undefined] : [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)) {
            // Allow the request
            callback(null, true)
        } else {
            // Reject the request
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

// Define a route.
app.use('/api/services', servicesRoutes)

// Define port.
const PORT = process.env.PORT || 4000

// Run the app.
app.listen(PORT, () => {
    console.log(colors.blue('El servidor se está ejecutando en el puerto:', colors.blue.bold(PORT)))
})