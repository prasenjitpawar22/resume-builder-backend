
import { ResumeHeader } from "@prisma/client";
import { Router, Response, Request } from "express";
import _ from "lodash";
import auth from "../../middleware/auth";
import { allHeader, createHeader, deleteHeader } from "./resume.service";

const resumeRoutes = Router()

/* Creating a route that is being called `/create-header` and it is using the `auth` middleware. It is
also using the `createHeader` function from the `resume.service` file. */
resumeRoutes.post('/create-header', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        const header = await createHeader(Request.body)
        Response.status(200).send(header)
    } catch (error: any) {
        Response.status(500).send(error.message)
    }
})

/* Creating a route that is being called `/delete-header` and it is using the `auth` middleware. It is
also using the `deleteHeader` function from the `resume.service` file. */
resumeRoutes.post('/delete-header', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        await deleteHeader(Request.body.id)
        Response.status(200).send('deleted')
    } catch (error: any) {
        Response.status(500).send(error.message)
    }
})

resumeRoutes.get('/get-all-header', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        const headers =  await allHeader(Request.body.userId)
        Response.status(200).send(headers)
    } catch (error: any) {
        Response.status(500).send(error.message)
    }
})



export default resumeRoutes