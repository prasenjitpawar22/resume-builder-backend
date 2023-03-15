import { ResumeEducation, ResumeExperience, ResumeHeader, User } from "@prisma/client"
import { randomUUID } from "crypto"
import { db } from "../../utils/db.server"


export const getAllHeader = async (id: string): Promise<ResumeHeader[] | null> => {
    const headers = await db.resumeHeader.findMany({
        where: {
            userId: id
        }
    })
    return headers
}

export const createHeader = async (data: ResumeHeader): Promise<ResumeHeader> => {
    const { contact, fullname, github, linkedin, website, userId, featureHeaderId } = data
    // const userId = user.id
    const header = await db.resumeHeader.create({
        data: {
            id: randomUUID(),
            contact,
            fullname,
            github,
            linkedin,
            website,
            userId,
            featureHeaderId,
        }

    })
    return header
}

export const deleteHeader = async (id: string): Promise<void> => {
    await db.resumeHeader.delete({
        where: {
            id: id
        }
    })
}

export const allHeader = async (id: string): Promise<ResumeHeader[]> => {
    const headers = await db.resumeHeader.findMany({
        where: {
            userId: id
        }
    })

    return headers
}

//***********************************Experience**************************************************** */

export const createExperience = async (data: ResumeExperience): Promise<ResumeExperience> => {
    const { company, current, description, end, featureExperienceId, position, start, userId } = data
    // const userId = user.id
    const experience = await db.resumeExperience.create({
        data: {
            id: randomUUID(),
            company,
            position,
            start,
            current,
            description,
            end,
            featureExperienceId,
            userId,
        }

    })
    return experience
}

export const getAllExperience = async (id: string): Promise<ResumeExperience[] | null> => {
    const experience = await db.resumeExperience.findMany({
        where: {
            userId: id
        }
    })
    return experience
}

export const deleteExperience = async (id: string): Promise<void> => {
    await db.resumeExperience.delete({
        where: {
            id: id
        }
    })
}

//***********************************Education**************************************************** */


export const getAllEducation = async (id: string): Promise<ResumeEducation[] | null> => {
    const education = await db.resumeEducation.findMany({
        where: {
            userId: id
        }
    })
    return education
}

export const deleteEducation = async (id: string): Promise<void> => {
    await db.resumeEducation.delete({
        where: {
            id: id
        }
    })
}

export const createEducation = async (data: ResumeEducation): Promise<ResumeEducation> => {
    const { end, featureEducationId, location, start, university, userId } = data
    // const userId = user.id
    const header = await db.resumeEducation.create({
        data: {
            id: randomUUID(),
            location,
            start,
            university,
            end,
            featureEducationId,
            userId,
        }

    })
    return header
}