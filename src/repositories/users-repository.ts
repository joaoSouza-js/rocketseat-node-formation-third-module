import type { Prisma } from "generated/prisma/client"

export type UserRole = "USER" | "ADMIN" | "MODERATOR"

export type RegisterUser = {
    id: string,
    name: string
    email: string
    password_hash: string,
    role: UserRole
}
export type User = {
    id: string
    name: string
    password_hash: string
    email: string
    role: UserRole
}



export interface UsersRepository {
    create(user: Prisma.UserCreateInput): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
    findUserById(id: string): Promise<User | null>
}