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


export default formRoutes