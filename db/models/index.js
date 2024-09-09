import { User, userSchema } from './userModel.js'

//Funcion que controlara las tablas
function setupModels(sequelize) {
    User.init(userSchema, User.config(sequelize))
}

export { setupModels }