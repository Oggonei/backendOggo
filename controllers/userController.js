import { User } from "../db/models/userModel.js"
import * as boom from '@hapi/boom'
import bcrypt from 'bcrypt'
import generateJWT from "../libs/generateJWT.js"
import generateToken from "../libs/generateToken.js"
import verifyEmail from "../libs/emails/verifyEmail.js"
import loginEmail from "../libs/emails/login.js"

const users = async (req, res, next) => {
  try {
    //const data = await sequelize.models.user.findAll()
    const users = await User.findAll()
    res.json({
      users
    })
  } catch (error) {
    const err = boom.badRequest(error.message)
    next(err)
  }
}

const register = async (req, res, next) => {
  try {
    let { name, lastname, email, telephoneNumber, password } = req.body
    //Buscar si ya existe
    const exist = await User.findOne({
      where: { email }
    });
    exist && next(boom.badRequest('User already exist'))
    //Encriptacion
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    //creacion en al base de datos
    const user = await User.create({ name, lastname, email, telephoneNumber, password })
    user && res.json({ msg: 'User added succesfuly' })
    //Enviar correo para validar usuario
    try {
      verifyEmail(user.token,email)
    } catch (error) {
      next(boom.badRequest('Error sending verification email'))
    }
  } catch (error) {
    const err = boom.badRequest(error.message)
    next(err)
  }
}

const update = async (req, res, next) => {
  const { name, lastname, email, telephoneNumber } = req.body
  let { password } = req.body
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: { id }
    });
    if (user) {
      user.name = name || user.dataValues.name
      user.lastname = lastname || user.dataValues.lastname
      user.email = email || user.dataValues.email
      user.telephoneNumber = telephoneNumber || user.dataValues.telephoneNumber
      user.password = password || user.dataValues.password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()
      user && res.json({ msg: 'User edited' })
    } else {
      next(boom.notFound('User not found'))
    }
  } catch (error) {
    const err = boom.badRequest(error.message)
    next(err)
  }
}

const destroy = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findOne({
      where: { id }
    });
    if (user) {
      user.destroy()
      res.json({ msg: 'User deleted' })
    } else {
      next(boom.notFound('User not found'))
    }
  } catch (error) {
    next(boom.badRequest(error.message))
  }
}

const confirm = async (req, res, next) => {
  const { token } = req.params
  try {
    const tokenDB = await User.findOne({
      where: { token }
    });
    if (!tokenDB) {
      return next(boom.badRequest('token error'))
    }
    tokenDB.token = null
    tokenDB.autenticated = true
    tokenDB.save()
    res.json({ msg: 'User confirmed' })
    try {
      loginEmail(tokenDB.email)
    } catch (error) {
      next(boom.badRequest('Error sending confirmation email'))
    }
  } catch (error) {
    next(boom.badRequest(error.message))
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({
      where: { email }
    });
    if (user) {
      if (user.autenticated) {
        const equal = await bcrypt.compare(password, user.password)
        if (equal) {
          res.json({ token: generateJWT(user.id) })
        } else {
          next(boom.notFound('Passwords do not match! Authentication failed'))
        }
      } else {
        next(boom.notFound('user not autenticated'))
      }
    } else {
      next(boom.notFound('User not found'))
    }

  } catch (error) {
    next(boom.badRequest(error.message))
  }
}

const profile = (req, res) => {
  console.log(req.user.dataValues)
  res.json({ msg: 'desde profile' })
}

const recoverPassword = async (req,res,next) => {
  const {email} = req.body
  const user = await User.findOne({
    where: { email }
  });
  if(user){
    try {
      user.token = generateToken()
      await user.save()
      res.json({msg: 'Instructions to recover password were sent to the email'})
    } catch (error) {
      next(boom.badRequest(`Error generating token, ${error.message}`))
    }
  } else {
    next(boom.notFound('User not found'))
  }
}

const validateToken = async (req, res,next) => {
  const { token } = req.params
  const user = await User.findOne({
    where: { token }
  });
  if(user){
    res.json({msg: 'The token is valid'})
  }else {
    next(boom.notFound('Token does not exist'))
  }
}

const newPassword = async (req, res, next) => {
  const { token } = req.params
  const { password } = req.body
  
  const user = await User.findOne({
    where: { token }
  })
  console.log(user)
  if(user){
    try {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      user.token = null
      await user.save()
      res.json({msg: 'Password changed successfully'})
    } catch (error) {
      next(boom.notFound(`Error restarting password, ${error.message}`))
    }
  }else {
    next(boom.notFound('Token does not exist'))
  }
}


export {
  register,
  users,
  update,
  destroy,
  confirm,
  login,
  profile,
  recoverPassword,
  validateToken,
  newPassword
}