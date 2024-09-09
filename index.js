// Importación librerias necesarias
import express from 'express'
import dotenv from 'dotenv'
import userRouter from "./routes/usersRoutes.js"
import { logErrors, errorHandler, boomErrorHandler } from './middlewares/error.handler.js'
import cors from 'cors'

var corsOptions = {
    origin: ['http://127.0.0.1', 'http://localhost:4000']
}

//dotenv.config() = Busca y lee el archivo con las variavles de entorno .env
dotenv.config()

//define puerto
const port = process.env.PORT || process.env.BACKEND_PORT || 4000


//crea extancia de express
const app = express()

app.use(cors());

//Permite respuestas en formato json
app.use(express.json())

//Crea la ruta
app.use(`${process.env.BACKEND_API}/users`, userRouter)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

//Define el puerto por donde escuchará la app
app.listen(port, () => {
    console.log(`Server funcionando en el puerto ${port}`)
})


