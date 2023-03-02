import { Router, Response, Request } from 'express'
import { Model, Mongoose, MongooseError } from 'mongoose'
import auth from '../middleware/auth'

import { FeatureEdu, FeatureExp, FeatureHeader, validateGet, validateHeaderCreateBody } from '../models/Feature'

const featureRoute = Router()
featureRoute.use(auth)



// get all feature header data 
featureRoute.get("/get-all-header", async (req, res) => {
    try {
        const { error } = validateGet(req.body)
        if (error) {
            return res.status(401).send(error.details[0].message)
        }
        const user = req.body.userid
        console.log(user);
        if (user) {
            FeatureHeader.find({ userid: user })
                .then((header) => {
                    return res.status(200).send(header)
                })
                .catch((err) => {
                    return res.status(501).send(err)
                })
        }
        // return res.status(401).send('userid not found')
    }
    catch (error) {
        return res.status(401).send(error)
    }
})

// create feature header
featureRoute.post("/set-feature-header", async (req, res) => {
    try {
        const { error } = validateHeaderCreateBody(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const featureHeader = new FeatureHeader(req.body)
        featureHeader.save((err, user) => {
            if (!err) {
                return res.status(200).send(user)
            }
            console.log(err.message);
            return res.status(501).send(err.message)
        })
    }
    catch (error: any) {
        res.status(401).send(error)
    }
})

// delete feature header
featureRoute.post("/remove-feature-header", async (req, res) => {
    try {
        let { id } = req.body
        if (!id) return res.status(404).send('id not found')

        FeatureHeader.remove({ _id: id })
            .then(() => {
                return res.status(200).send('deleted')
            })
            .catch((e:MongooseError) => {
                return res.status(501).send(e.message)
            })
    }
    catch (error) {
        return res.send(error)
    }
})

// -----edu
// get all education 
featureRoute.get("/get-all-feature-education", async (req, res) => {
    try {
        const featureEdu = await FeatureEdu.find({})
        return res.send(featureEdu)
    }
    catch (error) {
        res.send(error)
    }
})

//create 
featureRoute.post("/set-feature-education", async (req, res: Response) => {
    try {
        const featureEdu = new FeatureEdu(req.body)
        await featureEdu.save()
            .then((r) => {
                console.log(r);
            })
            .catch((e: MongooseError) => {
                console.log(e.message);
                return res.status(500).send(e.message)
            })
        return res.status(200).send(featureEdu)
    }
    catch (error: any) {
        res.status(400).send(error)
        console.log(error);
    }
})

// delete  
featureRoute.post("/remove-feature-education", async (req, res) => {
    try {
        let { id } = req.body
        if (!id) return res.status(404).send('id not found')

        await FeatureEdu.findByIdAndDelete({ _id: id })
        return res.status(200).send('deleted')
    }
    catch (error) {
        return res.status(500).send(error)
    }
})

//exp ----
//create feature exp
featureRoute.post("/create-feature-experience", async (req, res) => {
    const featureExp = new FeatureExp(req.body)
    try {
        await featureExp.save()
        return res.status(200).send(featureExp)
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// delete exp 
featureRoute.post("/remove-feature-experience", async (req, res) => {
    try {
        let { id } = req.body
        if (!id) return res.status(404).send('id not found')

        await FeatureExp.findByIdAndDelete({ _id: id })
            .then(() => {
                return res.status(200).send('deleted')
            })
            .catch((error: MongooseError) => {
                return res.status(500).send(error.message)
            })
    }
    catch (error) {
        return res.status(400).send(error)
    }
})

// get all exp 
featureRoute.get("/get-all-feature-experience", async (req, res) => {
    try {
        const featureEdu = await FeatureExp.find({})
        return res.status(200).send(featureEdu)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

export default featureRoute