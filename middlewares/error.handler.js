import * as boom from "@hapi/boom"

function logErrors (error, req, res, next){
    console.log(error)
    next(error)
}

function boomErrorHandler(error, req, res, next){
    if(error.isBoom){
        const { output} = error
        res.status(output.statusCode).json(output.payload)
    } else {
        next(error)
    }
}

function errorHandler(error, req, res, next){
    throw boom.badRequest(error)
}

export {
    logErrors,
    errorHandler,
    boomErrorHandler
}