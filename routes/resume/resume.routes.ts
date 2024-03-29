
import { ResumeHeader } from "@prisma/client";
import { Router, Response, Request } from "express";
import _ from "lodash";
import auth from "../../middleware/auth";
import { allHeader, createEducation, createExperience, createHeader, deleteEducation, deleteExperience, deleteHeader, getAllEducation, getAllExperience } from "./resume.service";

const resumeRoutes = Router()

/* Creating a route that is being called `/create-header` and it is using the `auth` middleware. It is
also using the `createHeader` function from the `resume.service` file. */
resumeRoutes.post('/add-header', auth, async (Request: Request, Response: Response) => {
    //after validation

    try {
        const header = await createHeader(Request.body)
        return Response.status(200).send(header)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

/* Creating a route that is being called `/delete-header` and it is using the `auth` middleware. It is
also using the `deleteHeader` function from the `resume.service` file. */
resumeRoutes.post('/delete-header', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        await deleteHeader(Request.body.id)
        return Response.status(200).send('deleted')
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

/* Creating a route that is being called `/get-all-header` and it is using the `auth` middleware. It is
also using the `allHeader` function from the `resume.service` file. */
resumeRoutes.get('/get-all-header', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        const headers = await allHeader(Request.body.userId)
        return Response.status(200).send(headers)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})


//***********************************Experience**************************************************** */

resumeRoutes.post('/add-experience', auth, async (Request: Request, Response: Response) => {
    //after validation

    try {
        const experience = await createExperience(Request.body)
        return Response.status(200).send(experience)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

resumeRoutes.get('/get-all-experience', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        const experience = await getAllExperience(Request.body.userId)
        return Response.status(200).send(experience)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

resumeRoutes.post('/delete-experience', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        await deleteExperience(Request.body.id)
        return Response.status(200).send('deleted')
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})


//***********************************Education**************************************************** */

resumeRoutes.get('/get-all-education', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        const education = await getAllEducation(Request.body.userId)
        return Response.status(200).send(education)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

resumeRoutes.post('/delete-education', auth, async (Request: Request, Response: Response) => {
    //after validation
    try {
        await deleteEducation(Request.body.id)
        return Response.status(200).send('deleted')
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

resumeRoutes.post('/add-education', auth, async (Request: Request, Response: Response) => {
    //after validation

    try {
        const education = await createEducation(Request.body)
        return Response.status(200).send(education)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

export default resumeRoutes