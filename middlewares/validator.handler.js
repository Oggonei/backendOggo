import * as boom from '@hapi/boom'

function validatorHandler ( schema, property){
    return (req, res, next) => {
        const data = req[property]
        const {error} = schema.validate(data, {abortEarly: false})
        if(error){
            const err = boom.badRequest(error.message)
            next(err)
        } else{
            next()
        }
    }
}

export default validatorHandler