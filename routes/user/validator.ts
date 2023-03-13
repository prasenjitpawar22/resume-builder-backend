import Joi from "joi"



export const LoginRequestValidator = (email: string) => {
    const schema = Joi.object({
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required()
    })
    return schema.validate(email)
}

type RegisterData = {
    fullname: string
    email: string
    password: string
}
export const RegisterRequestValidator = (data: RegisterData) => {
    const schema = Joi.object<RegisterData>({
        fullname:Joi.string().required().messages({'any.required': "fullname is required"}).label('full name'),
        email: Joi.string().min(3).required().email().messages({'any.required': "email is required"}).label('email'),
        password: Joi.string().min(3).required().messages({'any.required': "password is required"}).label('password'),
    })
    return schema.validate(data)
}