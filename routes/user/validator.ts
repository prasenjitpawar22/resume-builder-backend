import Joi from "joi"



export const LoginRequestValidator = (email: string) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(email)
}