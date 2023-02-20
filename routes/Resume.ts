import { Router, Request, Response } from 'express'

import { ResumeEdu, ResumeHeader } from '../model'
import { downloadPdf } from '../helper/downloadPdf'
import { MongooseError } from 'mongoose'

const resumeRoute = Router()

resumeRoute.get("/test", (req, res) => {
  res.send("send success")
})

//create header 
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

// resume education requests ---------------------------------------------------------------------------
// create
resumeRoute.post("/add-resume-education", async (req: Request, res: Response) => {
  const edu = new ResumeEdu(req.body)
  try {
    await edu.save()
      .then(() => {
        res.status(200).send(edu)
      })
      .catch((error: MongooseError) => {
        res.status(500).send(error.message)
      })
  }
  catch (error) {
    res.send(error)
  }
})

//get all
resumeRoute.get("/get-resume-education", async (req: Request, res: Response) => {
  const edu = await ResumeEdu.find({})
  try {
    res.status(200).send(edu);
  } catch (error) {
    res.status(500).send(error);
  }
})

//delete header
resumeRoute.post("/delete-resume-education", async (req, res) => {
  try {
    let { id } = req.body
    if (!id) return res.status(404).send('id not found')

    await ResumeEdu.deleteOne({ _id: id })
      .then(() => {
        return res.status(200).send('deleted')
      })
      .catch((error: MongooseError) => {
        return res.status(500).send("invalid id: "+ error.message)
      })
  }
  catch (error) {
    return res.send(error)
  }
})
export default resumeRoute