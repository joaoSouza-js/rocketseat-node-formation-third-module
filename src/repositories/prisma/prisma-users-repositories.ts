import { prisma } from "@/infra/prisma"
import type { RegisterUser, User, UsersRepository } from "@/repositories/users-repository"



export class prismaUsersRepositories implements UsersRepository {

    async create(user: RegisterUser): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password_hash: user.password_hash
            }
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