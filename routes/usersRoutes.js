import express, { Router } from 'express'
import { register, users, update, destroy, confirm, login, profile, recoverPassword, validateToken, newPassword } from '../controllers/userController.js'
import validatorHandler from '../middlewares/validator.handler.js'
import { createUserSchema, updateUserSchema, idUserSchema, tokenUserSchema,loginUserSchema, emailUserSchema } from '../schemas/user.schema.js'
import sequelize from '../libs/dbConnection.js'
import checkAuth from '../middlewares/auth.handler.js'

const userRouter = express.Router()

userRouter.get('/',  users)
userRouter.post('/register',validatorHandler(createUserSchema,'body'), register)
userRouter.post('/update/:id',validatorHandler(updateUserSchema,'body'),validatorHandler(idUserSchema,'params'), update)
userRouter.delete('/delete/:id',validatorHandler(idUserSchema,'params'), destroy)
userRouter.get('/confirm/:token',validatorHandler(tokenUserSchema,'params'),confirm)
userRouter.post('/login',validatorHandler(loginUserSchema,'body'),login)
userRouter.post('/recover-password',validatorHandler(emailUserSchema,'body'),recoverPassword)
userRouter.route('/recover-password/:token').get(validateToken).post(newPassword)


//private route
userRouter.get('/profile',checkAuth,profile)

export default userRouter

