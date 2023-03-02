import { Schema, model } from "mongoose";

// header- resume and feature
const ResumeHeaderSchema = new Schema({
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

export const ResumeHeader = model("ResumeHeader", ResumeHeaderSchema)


//education- resume and feature
const ResumeEduSchema = new Schema({
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
    start: { type: String },
    end: { type: String },
})

export const ResumeEdu = model("ResumeEducation", ResumeEduSchema)

// exp - resume 
//exp - feature
const ResumeExpSchema = new Schema({
    _id: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String },
    current: { type: String },
    description: { type: [String] },
})

export const ResumeExp = model("ResumeExp", ResumeExpSchema)