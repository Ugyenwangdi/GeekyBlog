class AppError extends Error{ // Inheriting from the parent class Error 
    constructor(message, statusCode ) { // Object will take the message and the statuscode 
        // call parent constructor using super 
        super(message) // message is the parameter that the built-in error accepts

        this.statusCode = statusCode 
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error'
        this.isOperational = true 

        Error.captureStackTrace(this, this.constructor)

    }

}

module.exports = AppError