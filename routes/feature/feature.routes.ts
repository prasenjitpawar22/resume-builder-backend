import { FeatureHeader } from "@prisma/client"
import { Router, Request, Response } from "express"
import _ from "lodash"

import auth from "../../middleware/auth"
import { allEducation, allExperience, allHeader, createEducation, createExperience, createHeader, deleteEducation, deleteExperience, deleteHeader } from "./feature.service"
import { createEducationHeaderValidator, createHeaderValidator } from "./validators"

const featureRoute = Router()

/* This is a route that is being created. It is a post request that is being sent to the server. The
route is `/create-header`. The middleware is `auth`. The function is an async function that is
taking in a request and a response. The function is trying to create a header. If it is successful,
it will send a status of 200 and the header. If it is not successful, it will send a status of 500
and the error message. */
featureRoute.post('/create-header', auth, async (Request: Request, Response: Response) => {
    const { error } = createHeaderValidator(Request.body)

    if (error) {
        return Response.status(400).json({ error: error.details[0].message })
    }

    try {
        const header = await createHeader(Request.body)
        return Response.status(200).send(header)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }

})

/* This is a route that is being created. It is a get request that is being sent to the server. The
route is `/get-all-header`. The middleware is `auth`. The function is an async function that is
taking in a request and a response. The function is trying to get all the headers. If it is
successful,
it will send a status of 200 and the headers. If it is not successful, it will send a status of 500
and the error message. */
featureRoute.get('/get-all-header', auth, async (Request: Request, Response: Response) => {
    try {
        const headers = await allHeader(Request.body.userId)
        // return Response.status(200).send(headers)
        return Response.status(400)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

/* Creating a route that is being called `/delete-header` and it is using the `auth` middleware. It is
also using the `deleteHeader` function from the `feature.service` file. */
featureRoute.post('/delete-header', auth, async (Request: Request, Response: Response) => {
    try {
        await deleteHeader(Request.body.id)
        return Response.status(200).send('deleted')
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})


// ************************Education routes************************************************************************
/* Creating a route that is being called `/create-education` and it is using the `auth` middleware. It
is also using the `createEducation` function from the `feature.service` file. */
featureRoute.post('/create-education', auth, async (Request: Request, Response: Response) => {
    const { error } = createEducationHeaderValidator(Request.body)

    if (error) {
        return Response.status(400).json({ error: error.details[0].message })
    }

    try {
        const header = await createEducation(Request.body)
        return Response.status(200).send(header)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }

})

/* Creating a route that is being called `/get-all-education` and it is using the `auth`
middleware. It is also using the `allEducation` function from the `feature.service` file. */
featureRoute.get('/get-all-education', auth, async (Request: Request, Response: Response) => {
    try {
        const education = await allEducation(Request.body.userId)
        return Response.status(200).send(education)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

/* Creating a route that is being called `/delete-education` and it is using the `auth`
middleware. It is also using the `deleteEducation` function from the `feature.service` file. */
featureRoute.post('/delete-education', auth, async (Request: Request, Response: Response) => {
    try {
        await deleteEducation(Request.body.id)
        return Response.status(200).send('deleted')
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

// ***************************Experience routes*****************************************************************

/* Creating a route that is being called `/create-experience` and it is using the `auth`
middleware. It is also using the `createExperience` function from the `feature.service` file. */
featureRoute.post('/create-experience', auth, async (Request: Request, Response: Response) => {
    try {
        const header = await createExperience(Request.body)
        return Response.status(200).send(header)
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

/* Creating a route that is being called `/delete-experience` and it is using the `auth`
middleware. It is also using the `deleteExperience` function from the `feature.service` file. */
featureRoute.post('/delete-experience', auth, async (Request: Request, Response: Response) => {
    try {
        await deleteExperience(Request.body.id)
        return Response.status(200).send('deleted')
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

featureRoute.get('/get-all-experience', auth, async (Request: Request, Response: Response) => {
    try {
        const experience = await allExperience(Request.body.userId)
        if (experience.length > 0) {
            return Response.status(200).send(experience)
        }
        else return Response.status(201).send("experience not found")
    } catch (error: any) {
        return Response.status(500).send(error.message)
    }
})

// ***************************Skills routes*****************************************************************

export default featureRoute