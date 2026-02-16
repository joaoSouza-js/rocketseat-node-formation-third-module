import { prisma } from "@/infra/prisma"
import type { RegisterUser, User, UsersRepository } from "@/repositories/users-repository"



export class prismaUsersRepositories implements UsersRepository {


    async create(user: RegisterUser): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                password_hash: user.password_hash,
                role: user.role
            }
        })
        return newUser
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    }
}