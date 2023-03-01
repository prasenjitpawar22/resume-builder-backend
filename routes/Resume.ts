import { Router, Request, Response } from 'express'
import { MongooseError } from 'mongoose'

import auth from '../middleware/auth';

import { ResumeEdu, ResumeExp, ResumeHeader } from '../model'
import { downloadPdf } from '../helper/downloadPdf'

const resumeRoute = Router()
resumeRoute.use(auth)

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

//get all edu
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

// resume exp request-------------------------------------------------------------------
// create 
resumeRoute.post("/create-resume-experience", async (req, res) => {
  const expData = new ResumeExp(req.body)
  console.log(expData);
  
  try {
    await expData.save()
    return res.status(200).send('created')
  } catch (error:any) {
    return res.status(500).send(error.message)
  }
})

//delete exp
resumeRoute.post("/delete-resume-experience", async (req, res) => {
  try {
    let { id } = req.body
    if (!id) return res.status(404).send('id not found')

    await ResumeExp.deleteOne({ _id: id })
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


//get all exp
resumeRoute.get("/get-resume-experience", async (req: Request, res: Response) => {
  const edu = await ResumeExp.find({})
  try {
    res.status(200).send(edu);
  } catch (error) {
    res.status(500).send(error);
  }
})





export default resumeRoute