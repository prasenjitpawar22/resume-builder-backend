import { db } from "../../utils/db.server"
import bcrypt from 'bcrypt'
import { randomUUID } from "crypto"
import { User } from "@prisma/client"

/* createUser that takes in a user object and returns a promise of a user object. */
export const createUser = async (user: Omit<User, "id">): Promise<Omit<User, "password">> => {
    const { email, password, name } = user
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return db.user.create({
        data: {
            id: randomUUID(),
            email,
            name,
            password: hashPassword,
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })
}

/* A function that takes in a email:string and returns a promise of a user object or null. */
export const getUserByEmail = async (email: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            email
        }
    })
}

export const getUserById = async (id: string): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id
        }
    })
}

export const getAllUsers = async (): Promise<User[]> => {
    return await db.user.findMany()
}

export const removeAllUsers = async () => {
    return await db.user.deleteMany()
}

// export