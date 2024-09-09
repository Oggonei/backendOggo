import Joi from 'joi'

const id = Joi.number()
const name = Joi.string().min(2).max(15)
const lastname = Joi.string().min(2).max(15)
const email = Joi.string().min(2).max(35).email()
const password = Joi.string().min(2).max(15)
const telephoneNumber = Joi.string().min(2).max(10)
const token = Joi.string()

const createUserSchema = Joi.object({
    name: name.required(),
    lastname: lastname.required(),
    email: email.required(),
    password: password.required(),
    telephoneNumber: telephoneNumber.required(),
})

const updateUserSchema = Joi.object({
    name,
    lastname,
    email,
    password,
    telephoneNumber
})

const idUserSchema = Joi.object({
    id: id.required()
})

const tokenUserSchema = Joi.object({
    token: token.required()
})

const loginUserSchema = Joi.object({
    password: password.required(),
    email: email.required()
})

const emailUserSchema = Joi.object({
    email: email.required()
})

export {
    createUserSchema,
    updateUserSchema,
    idUserSchema,
    tokenUserSchema,
    loginUserSchema,
    emailUserSchema
}