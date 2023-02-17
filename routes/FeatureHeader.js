import express, { Router } from 'express'

import { FeatureHeader } from '../model.js'

const featureHeaderRoute = Router()

// get all feature header data 
featureHeaderRoute.get("/get-all-header", async (req, res) => {
    console.log('in gell a');
    try {
        const featureHeader = FeatureHeader.find({})
        return res.send(featureHeader)
    }
    catch (error) {
        res.send(error)
    }
})

// post feature header
featureHeaderRoute.post("/set-feature-header", async (req, res) => {
    try {
        FeatureHeader.create(req.body.data)
            .then(() => { return res.send('created') })
            .catch((error) => { return res.send(error) })
    }
    catch (error) {
        res.send(error)
        console.log(error);
    }
})


export default featureHeaderRoute