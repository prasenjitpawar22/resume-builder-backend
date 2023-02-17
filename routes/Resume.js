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
resumeRoute.delete("/delete-resume-header", async (req, res) => {
    try {
        ResumeHeader.findByIdAndDelete(req.body.id, function (error) {
            if (!error) {
                ResumeHeader
                return res.status(200).send('done')
            }
            else {
                return res.send(error)
            }
        })
    } catch (error) {
        console.log(error);
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