import { body } from 'express-validator'

export const createHeaderValidator = [
    body('userId', 'UserId field invalid').isUUID(),
    body('fullname', 'fullname field invalid').exists({ checkFalsy: true, checkNull: true }).
        isLength({ min: 1, max: 20 }).trim(),
    body('contact', 'contact field invalid').isLength({min: 12})
    // body('linkedin') 
    // body('github') 
    // body('website').not
]

 