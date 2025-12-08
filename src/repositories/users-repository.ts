import { Prisma } from "generated/prisma/client"

export type RegisterUser = {
    name: string
    email: string
    password_hash: string
}
export type User = {
    name: string
    password_hash: string
    email: string
}



export interface UsersRepository {
    create(user: Prisma.UserCreateInput): Promise<User>
    userEmailExists(email: string): Promise<boolean>
}