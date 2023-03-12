import { FeatureEducation, FeatureHeader, FeatureExperience } from '@prisma/client'
import Joi from 'joi'

export const createHeaderValidator = (featureHeader: FeatureHeader) => {
    const schema = Joi.object({
        userId: Joi.string().uuid().required().messages({ 'any.required': `is required` }).label('user id'),
        contact: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
            'string.pattern.base': "invalid mobile number",
            'string.base': `invalid contact`,
            'string.min': `contact should have a minimum length of {#limit}`,
        }),
        fullname: Joi.string().max(20).required().messages({ 'any.required': `is required` }),
        linkedin: Joi.string().allow(""),
        github: Joi.string().allow(""),
        website: Joi.string().allow(""),
    })
    return schema.validate(featureHeader)
}

export const createEducationHeaderValidator = (featureEducation: FeatureEducation) => {
    const schema = Joi.object<FeatureEducation>({
        userId: Joi.string().uuid().required().messages({ 'any.required': `is required` }).label('user id'),
        university: Joi.string().required().messages({}),
        location: Joi.string().required().messages({}),
        start: Joi.string().required(),
        end: Joi.string(),
    });
    return schema.validate(featureEducation)
}

export const createEducationExperienceValidator = (featureExperience: FeatureExperience) => {
    const schema = Joi.object<FeatureExperience>({
        company: Joi.string().required().messages({}),
        current: Joi.boolean().required().messages({ 'any.required': 'current is required' }),
        description: Joi.array().allow().messages({ 'string.base': 'invalid description' }),
        end: Joi.string().allow("").messages({ 'string.base': 'invalid end date' }),
        position: Joi.string().required().messages({}),
        start: Joi.string().required(),
        userId: Joi.string().uuid().required().messages({ 'any.required': `is required` }).label('user id'),
    })
    return schema.validate(featureExperience)
}