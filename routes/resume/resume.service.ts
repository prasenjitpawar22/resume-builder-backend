import { ResumeExperience, ResumeHeader, User } from "@prisma/client"
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
    const header = await db.resumeExperience.create({
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
    return header
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