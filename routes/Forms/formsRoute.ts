import { randomUUID } from "crypto";
import { Router, Response, Request, response } from "express";
import auth from "../../middleware/auth";
import { db } from "../../utils/db.server";



const formRoutes = Router()

formRoutes.post('/add-summary', auth, async (req: Request, res: Response) => {

    try {
        await db.summary.create({
            data: {
                id: randomUUID(),
                summary: req.body.summary,
                userId: req.body.userId,
            }
        })
        return res.send('added')
    } catch (error) {
        return res.send(error)
    }

})

formRoutes.get('/get-summary', auth, async (req: Request, res: Response) => {
    try {
        const summary = await db.summary.findFirst({
            where: {
                userId: req.body.userId,
            }
        })
        return res.send(summary).statusCode === 200

    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/update-summary', auth, async (req: Request, res: Response) => {
    try {
        const summary = await db.summary.update({
            data: {
                summary: req.body.summary
            },
            where: {
                id: req.body.id,
            }
        })
        return res.send(summary).statusCode === 200

    } catch (error) {
        return res.send(error)
    }
})

//*******************************skills************************ */
formRoutes.post('/add-skill', auth, async (req: Request, res: Response) => {
    try {
        const skill = await db.skills.create({
            data: {
                id: randomUUID(),
                skill: req.body.skill,
                userId: req.body.userId
            }
        })
        return res.send(skill)
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/update-skill', auth, async (req: Request, res: Response) => {
    try {
        const skill = await db.skills.update({
            data: {
                skill: req.body.skill,
                userId: req.body.userId
            },
            where: {
                id: req.body.id
            }
        })
        return res.send('updated')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/remove-skill', auth, async (req: Request, res: Response) => {
    try {
        await db.skills.delete({
            where: {
                id: req.body.id
            }
        })
        return res.send('removed')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.get('/get-all-skills', auth, async (req: Request, res: Response) => {
    try {
        const skills = await db.skills.findMany({
            where: {
                userId: req.body.userId,
            }
        })
        return res.send(skills)
    } catch (error) {
        return res.send(error)
    }
})

//*******************************experience************************ */
formRoutes.post('/add-experience', auth, async (req: Request, res: Response) => {
    try {
        await db.experience.create({
            data: {
                id: randomUUID(),
                userId: req.body.userId,
                achivements: req.body.achivements,
                company: req.body.company,
                endYear: req.body.endYear,
                location: req.body.location,
                present: req.body.present,
                role: req.body.role,
                startYear: req.body.startYear,
            }
        })
        return res.send('created')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/update-experience', auth, async (req: Request, res: Response) => {
    try {
        const skill = await db.experience.update({
            data: {
                achivements: req.body.achivements,
                company: req.body.company,
                endYear: req.body.endYear,
                location: req.body.location,
                present: req.body.present,
                role: req.body.role,
                startYear: req.body.startYear,
            },
            where: {
                id: req.body.id
            }
        })
        return res.send('updated')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/remove-experience', auth, async (req: Request, res: Response) => {
    try {
        await db.experience.delete({
            where: {
                id: req.body.id
            }
        })
        return res.send('removed')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.get('/get-all-experiences', auth, async (req: Request, res: Response) => {
    try {
        const experiences = await db.experience.findMany({
            where: {
                userId: req.body.userId,
            }
        })
        return res.send(experiences)
    } catch (error) {
        return res.send(error)
    }
})

//*******************************education************************ */
formRoutes.post('/add-education', auth, async (req: Request, res: Response) => {
    try {
        const education = await db.education.create({
            data: {
                id: randomUUID(),
                userId: req.body.userId,
                location: req.body.location,
                degree: req.body.degree,
                university: req.body.university,
                year: req.body.year,
                gpa: req.body.gpa,
                minor: req.body.minor,
            }
        })
        return res.send(education)
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/update-education', auth, async (req: Request, res: Response) => {
    try {
        const education = await db.education.update({
            data: {
                location: req.body.location,
                degree: req.body.degree,
                university: req.body.university,
                year: req.body.year,
                gpa: req.body.gpa,
                minor: req.body.minor,
            },
            where: {
                id: req.body.id
            }
        })
        return res.send(education)
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/remove-education', auth, async (req: Request, res: Response) => {
    try {
        await db.education.delete({
            where: {
                id: req.body.id
            }
        })
        return res.send('removed')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.get('/get-all-educations', auth, async (req: Request, res: Response) => {
    try {
        const educations = await db.education.findMany({
            where: {
                userId: req.body.userId,
            }
        })
        return res.send(educations)
    } catch (error) {
        return res.send(error)
    }
})



//*******************************contact************************ */
formRoutes.post('/add-contact', auth, async (req: Request, res: Response) => {
    try {
        await db.contact.create({
            data: {
                id: randomUUID(),
                userId: req.body.userId,
                city: req.body.city,
                country: req.body.country,
                email: req.body.email,
                fullname: req.body.fullname,
                linkedin: req.body.linkedin,
                phone: req.body.phone,
                state: req.body.state,
                website: req.body.website,
            }
        })
            .then((contact) => {
                return res.send(contact)
            })
            .catch((err) => {
                console.log(err);

                res.send(err)
            })
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/update-contact', auth, async (req: Request, res: Response) => {
    try {
        const contact = await db.contact.update({
            data: {
                userId: req.body.userId,
                city: req.body.city,
                country: req.body.country,
                email: req.body.email,
                fullname: req.body.fullname,
                linkedin: req.body.linkedin,
                phone: req.body.phone,
                state: req.body.state,
                website: req.body.website,
                show: req.body.show
            },
            where: {
                id: req.body.id
            }
        })
        return res.send(contact)
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.post('/remove-contact', auth, async (req: Request, res: Response) => {
    try {
        await db.contact.delete({
            where: {
                id: req.body.id
            }
        })
        return res.send('removed')
    } catch (error) {
        return res.send(error)
    }
})

formRoutes.get('/get-all-contacts', auth, async (req: Request, res: Response) => {
    try {
        const contacts = await db.contact.findMany({
            where: {
                userId: req.body.userId,
            }
        })
        return res.send(contacts)
    } catch (error) {
        return res.send(error)
    }
})

export default formRoutes