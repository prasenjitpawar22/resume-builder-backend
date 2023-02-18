import express, { Router } from 'express'

import { ResumeHeader } from '../model.js'
import { downloadPdf } from '../helper/downloadPdf.js'

const resumeRoute = Router()

resumeRoute.get("/test", (req, res) => {
    res.send("send success")
})

//post header 
resumeRoute.post("/set-resume-header", async (req, res) => {
    const header = new ResumeHeader(req.body)
    try {
        await header.save()
        res.send(header)
    }
    catch (error) {
        res.send(error)
    }
})

//get header
resumeRoute.get("/get-resume-header", async (req, res) => {
    const header = await ResumeHeader.find({})
    console.log('asds');
    try {
        res.send(header);
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete header
resumeRoute.post("/delete-resume-header", async (req, res) => {
    try {
        let { id } = req.body
        if (!id) return res.status(404).send('id not found')

        await ResumeHeader.deleteOne({ _id: id })
        return res.status(200).send('deleted')
    }
    catch (error) {
        return res.send(error)
    }
})

//download resume
resumeRoute.get("/download-resume", async (req, res) => {
    console.log('innnn');
    try {
        await downloadPdf()
        return res.send('ok')
    }
    catch (error) {
        res.send(error)
    }
})

export default resumeRoute