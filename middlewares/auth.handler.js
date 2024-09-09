import * as boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import { User } from '../db/models/userModel.js'

const checkAuth = async (req, res, next) => {
    const { token } = req.headers
    if (token) {

        try {
            const decoded = jwt.decode(token, process.env.JWT_SECRET)
            console.log(decoded.id)
            req.user = await User.findOne({
                attributes: ['id', 'email', 'name', 'lastname'],
                where: { id: decoded.id }
            })
            return next()
        } catch (error) {
            next(boom.badRequest('Error validating token'))
        }
    } else {
        next(boom.badRequest('Token does not exist'))
    }
    next()
}

export default checkAuth