import type { User, UserRole } from "@/repositories/users-repository"

export interface RegisterUserCommand {
    name: string,
    email: string,
    password: string
    role: UserRole
}

export interface RegisterUserUseCaseResponse {
    user: User
}
