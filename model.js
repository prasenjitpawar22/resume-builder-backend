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

// header- resume and feature
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


//education- resume and feature
const ResumeEduSchema = new Schema({
    university: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    start: { type: String },
    end: { type: String },
})

export const ResumeEdu = model("ResumeEducation", ResumeEduSchema)

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
    },
    start: { type: String, required: true},
    end: { type: String, required: true },
})

export const FeatureEdu = model("FeatureEducation", FeatureEduSchema)
