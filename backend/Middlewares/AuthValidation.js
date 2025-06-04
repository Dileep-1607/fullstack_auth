
const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(50).required(),

    });

    if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is missing" });
}

    const { error }  = schema.validate(req.body, )

    if(error){
        return res.status(400).json({message:"Bad request", error})
    }
    next();
}

const loginValidation = (req, res, next)=>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(50).required(),

    });
    
 if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is missing" });
}
    const {error}  = schema.validate(req.body)

    if(error){
        return res.status(400).json({message:"Bad request", error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}