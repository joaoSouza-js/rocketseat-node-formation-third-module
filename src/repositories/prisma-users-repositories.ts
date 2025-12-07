import { prisma } from "@/infra/prisma"
import { Prisma } from "generated/prisma/client"

interface RegisterUser {
    name: string,
    email: string,
    hashedPassword: string
}


export class prismaUsersRepositories {
    async createUser(data: Prisma.UserCreateInput) {
        const newUser = await prisma.user.create({
            data: data
        })

        return newUser
    }

    async userEmailExists(email: string): Promise<boolean> {
        const userExist = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        return !!userExist
    }
}