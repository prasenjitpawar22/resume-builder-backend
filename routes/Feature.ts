import  { Router, Response, Request } from 'express'
import { Mongoose, MongooseError } from 'mongoose'

import { FeatureEdu, FeatureHeader } from '../model'

const featureRoute = Router()

// get all feature header data 
featureRoute.get("/get-all-header", async (req, res) => {
    try {
        const featureHeader = await FeatureHeader.find({})
        return res.send(featureHeader)
    }
    catch (error) {
        res.send(error)
    }
})

// create feature header
featureRoute.post("/set-feature-header", async (req, res) => {
    const featureHeader = new FeatureHeader(req.body)
    try {
        await featureHeader.save()
        return res.status(200).send(featureHeader)
    }
    catch (error) {
        res.send(error)
        console.log(error);
    }
})

// delete feature header
featureRoute.post("/remove-feature-header", async (req, res) => {
    try {
        let { id } = req.body
        if (!id) return res.status(404).send('id not found')

        await FeatureHeader.deleteOne({ _id: id })
        return res.status(200).send('deleted')
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
featureRoute.post("/set-feature-education", async (req, res:Response) => {
    try {
        const featureEdu = new FeatureEdu(req.body)
        await featureEdu.save()
        .then((r)=> {console.log(r);
        })
        .catch((e:MongooseError)=> {
            console.log(e.message);
            return res.status(500).send(e.message)
        })
        return res.status(200).send(featureEdu)
    }
    catch (error:any) {
        res.status(400).send(error)
        console.log(error);
    }
})

// delete  
featureRoute.post("/remove-feature-education", async (req, res) => {
    try {
        let { id } = req.body
        if (!id) return res.status(404).send('id not found')

        await FeatureEdu.findByIdAndDelete({_id:id})
        return res.status(200).send('deleted')
    }
    catch (error) {
        return res.status(500).send(error)
    }
})

export default featureRoute