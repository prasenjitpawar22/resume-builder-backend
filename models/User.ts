import { Schema, model } from "mongoose";
import Joi, { string } from "joi";
import { FeatureEdu, FeatureHeader } from "./Feature";

type IUser = {
    _id: string
    name: string
    email: string
    password: string
}
const UserSchema = new Schema<IUser>({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

/* A mongoose middleware that is called after the user is removed. */
UserSchema.post('remove', document =>  {
    // FeatureEdu.remove({})
    const userid = document._id
    FeatureHeader.remove({userid: userid})
})

/* Creating a model called User. */
export const User = model<IUser>("user", UserSchema)


/**
 * It takes an object of type IUser and returns a Joi validation result.
 * @param {IUser} user - IUser - the user object that we want to validate
 * @returns The return value is an object with two properties:
 * error: If validation fails, this property will contain an object with details about the validation
 * failure.
 * value: If validation succeeds, this property will contain the value after validation.
 */
export function validateResgisterUser(user: IUser) {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}

export function validateLoginUser(user: IUser) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user);
}