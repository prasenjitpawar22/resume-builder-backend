import express, { Router } from 'express'

import { FeatureHeader } from '../model.js'

const featureHeaderRoute = Router()

// get all feature header data 
featureHeaderRoute.get("/get-all-header", async (req, res) => {
    console.log('in gell a');
    try {
        const featureHeader = await FeatureHeader.find({})
        console.log(featureHeader);
        return res.send(featureHeader)
    }
    catch (error) {
        res.send(error)
    }
})

// post feature header
featureHeaderRoute.post("/set-feature-header", async (req, res) => {
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
featureHeaderRoute.post("/remove-feature-header", async (req, res) => {
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


export default featureHeaderRoute