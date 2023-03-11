import { FeatureEducation, FeatureExperience, FeatureHeader, User } from "@prisma/client"
import { randomUUID } from "crypto"

import { db } from "../../utils/db.server"


// ************************header serives*********************************************************************
/**
 * This function returns a list of all the headers for a given user.
 * @param {string} id - string - the id of the user
 * @returns An array of FeatureHeader objects.
 */

export const getAllHeader = async (id: string): Promise<FeatureHeader[] | null> => {
    const headers = await db.featureHeader.findMany({
        where: {
            userId: id
        }
    })
    return headers
}

/**
 * It creates a new header for a user.
 * @param data - Omit<FeatureHeader, "id">
 * @returns The header is being returned.
 */
export const createHeader = async (data: Omit<FeatureHeader, "id">): Promise<Omit<FeatureHeader, "userId">> => {
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
        },
        select: {
            id: true,
            contact: true,
            fullname: true,
            github: true,
            linkedin: true,
            website: true,
        }
    })
    return header
}

/**
 * Delete a feature header from the database.
 * @param {string} id - string
 */
export const deleteHeader = async (id: string): Promise<void> => {
    await db.featureHeader.delete({
        where: {
            id: id
        }
    })
}

/**
 * This function takes in a userId and returns an array of FeatureHeader objects.
 * @param {string} id - string - the id of the user
 * @returns An array of FeatureHeader objects
 */
export const allHeader = async (id: string): Promise<FeatureHeader[]> => {
    const headers = await db.featureHeader.findMany({
        where: {
            userId: id
        }
    })

    return headers
}

// ************************education serives*********************************************************************
/**
 * It takes in a data object, and creates a new education object in the database
 * @param data - Omit<FeatureEducation, "id">
 * @returns {
 *   "id": "c9f9f9f9-f9f9-f9f9-f9f9-f9f9f9f9f9f9",
 *   "location": "New York",
 *   "start": "2020-01-01T00:00:00.000Z",
 *   "end
 * 
 */
export const createEducation = async (data: Omit<FeatureEducation, "id">): Promise<Omit<FeatureEducation, "userId">> => {
    const { end, location, start, university, userId } = data
    const startDate = new Date(start)
    const endDate = end ? new Date(end) : null

    const education = await db.featureEducation.create({
        data: {
            id: randomUUID(),
            location,
            start: startDate,
            end: endDate,
            university,
            userId,
        },
        select: {
            end: true, id: true, location: true, start: true, university: true
        }
    })
    return education
}

/**
 * This function returns all the education of a user.
 * @param {string} id - string
 * @returns An array of FeatureEducation objects
 */
export const allEducation = async (id: string): Promise<FeatureEducation[]> => {
    const educations = await db.featureEducation.findMany({
        where: {
            userId: id
        },
    })

    return educations
}

/**
 * Delete a row from the featureEducation table where the id matches the id passed in as a parameter.
 * @param {string} id - string
 */
export const deleteEducation = async (id: string): Promise<void> => {
    await db.featureEducation.delete({
        where: {
            id: id
        }
    })
}

// ************************experience service*********************************************************************

export const createExperience = async (data: Omit<FeatureExperience, "id">): Promise<FeatureExperience> => {
    const { end, company, start, current, userId, description, position } = data
    const startDate = new Date(start)
    const endDate = end ? new Date(end) : null

    const experience = await db.featureExperience.create({
        data: {
            id: randomUUID(),
            company,
            description,
            position,
            current,
            userId,
            start: startDate,
            end: endDate,
        }
    })
    return experience
}

export const allExperience = async (id: string): Promise<FeatureExperience[]> => {
    const experience = await db.featureExperience.findMany({
        where: {
            userId: id
        }
    })

    return experience
}


export const deleteExperience = async (id: string): Promise<void> => {
    await db.featureExperience.delete({
        where: {
            id: id
        }
    })
}