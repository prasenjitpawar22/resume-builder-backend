import { ResumeHeader, User } from "@prisma/client"
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

export const createHeader = async (data: Omit<ResumeHeader, "id">): Promise<ResumeHeader> => {
    const { contact, fullname, github, linkedin, website, userId } = data
    // const userId = user.id
    const header = await db.resumeHeader.create({
        data: {
            id: randomUUID(),
            contact,
            fullname,
            github,
            linkedin,
            website,
            userId
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