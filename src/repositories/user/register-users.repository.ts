import { prisma } from "@/infra/prisma"

interface RegisterUser {
    name: string,
    email: string,
    hashedPassword: string
}

export async function registerUserRepository(user: RegisterUser) {
    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password_hash: user.hashedPassword
        }
    })
}