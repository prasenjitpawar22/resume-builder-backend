import Joi from "joi";
import { Schema, model } from "mongoose";

type getValidate = {
    _id: string
}
export function validateGet(userid: getValidate) {
    const schema = Joi.object({
         userid: Joi.string().required()
    })
    return schema.validate(userid);
}
// header- feature 
interface IHeader {
    _id: string
    userid: string
    fullname: string
    contact: string
    linkedin: string
    github: string
    website: string
}

const FeatureHeaderSchema = new Schema<IHeader>({
    _id: {
        type: String,
        required: true
    },
    userid: {
        type: Schema.Types.String,
        ref: 'users'
    },
    fullname: {
        type: String,
        required: true
    },
    contact: { type: String },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String },
})

export const FeatureHeader = model<IHeader>("FeatureHeader", FeatureHeaderSchema)

export function validateHeaderCreateBody(header: IHeader) {
    const schema = Joi.object({
        _id: Joi.string().required(),
        userid: Joi.string().required(),
        fullname: Joi.string().max(50).required(),
        contact: Joi.string().max(12).required(),
        linkedin: Joi.string(),
        website: Joi.string(),
        github: Joi.string(),
    })
    return schema.validate(header);
}


//------------------------------- edu- feature ----------
const FeatureEduSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    start: { type: String, required: true },
    end: { type: String, required: true },
})

export const FeatureEdu = model("FeatureEducation", FeatureEduSchema)

//exp - feature
const FeatureExpSchema = new Schema({
    _id: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String },
    current: { type: String },
    description: { type: [String] }
})

export const FeatureExp = model("FeatureExp", FeatureExpSchema)