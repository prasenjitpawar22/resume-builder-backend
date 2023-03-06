import { FeatureHeader, User } from "@prisma/client"
import { randomUUID } from "crypto"
import { db } from "../../utils/db.server"


export const getAllHeader = async (id: string): Promise<FeatureHeader[] | null> => {
    const headers = await db.featureHeader.findMany({
        where: {
            userId: id
        }
    })
    return headers
}

export const createHeader = async (data: Omit<FeatureHeader, "id">): Promise<FeatureHeader> => {
    const { contact, fullname, github, linkedin, website, userId } = data
    // const userId = user.id
    const header = await db.featureHeader.create({
        data: {
            id: randomUUID(),
            contact,
            fullname,
            github,
            linkedin,
            website,
            userId,
        }

    })
    return header
}

export const deleteHeader = async (id: string): Promise<void> => {
    await db.featureHeader.delete({
        where: {
            id: id
        }
    })
}

export const allHeader = async (id: string): Promise<FeatureHeader[]> => {
    const headers = await db.featureHeader.findMany({
        where: {
            userId: id
        }
    })

    return headers
}