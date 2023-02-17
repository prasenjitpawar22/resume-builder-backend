import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
    },
});

export const User = model("User", UserSchema);


const ResumeHeaderSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    contact: { type: String },
    linkedin: { type: String },
    github: { type: String },
    website: { type: String },
})

export const ResumeHeader = model("ResumeHeader", ResumeHeaderSchema)


const FeatureHeaderSchema = new Schema({
    _id: {
        type: String,
        required: true
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

export const FeatureHeader = model("FeatureHeader", FeatureHeaderSchema)