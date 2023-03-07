import { FeatureEducation, FeatureHeader } from '@prisma/client'
import Joi from 'joi'

export const createHeaderValidator = (featureHeader: FeatureHeader) => {
    const schema = Joi.object({
        userId: Joi.string().uuid().required().messages({ 'any.required': `is required` }).label('user id'),
        contact: Joi.string().min(12).required().messages({
            'string.base': `invalid contact`,
            'string.min': `contact should have a minimum length of {#limit}`,
        }),
        fullname: Joi.string().max(20).required().messages({ 'any.required': `is required` }),
        linkedin: Joi.string().messages({}),
        github: Joi.string().messages({}),
        website: Joi.string().messages({}),
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

