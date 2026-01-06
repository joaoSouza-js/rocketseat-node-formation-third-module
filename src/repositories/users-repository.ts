import type { Prisma } from "generated/prisma/client"

export type RegisterUser = {
    id: string,
    name: string
    email: string
    password_hash: string
}
export type User = {
    id: string
    name: string
    password_hash: string
    email: string
}



export interface UsersRepository {
    create(user: Prisma.UserCreateInput): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
}