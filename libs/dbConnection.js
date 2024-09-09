import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { setupModels } from '../db/models/index.js'

//busca las variables de entrno
dotenv.config()

//crea la conexion a base de datos
const url = `postgres://${process.env.BACKEND_DBUSER}:${process.env.BACKEND_DBPASSWORD}@${process.env.BACKEND_DBHOST}:${process.env.BACKEND_DBPORT}/${process.env.BACKEND_DBNAME}`
const sequelize = new Sequelize(url,{
    dialect: 'postgres',
    logging: console.log
}) 

//Envia la conexion al modelo
setupModels(sequelize)

//sincroniza los cambios en la base de datos
sequelize.sync()

export default sequelize

 



