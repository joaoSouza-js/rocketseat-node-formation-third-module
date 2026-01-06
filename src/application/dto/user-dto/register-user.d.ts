import type { User } from "@/repositories/users-repository"

export interface RegisterUserCommand {
    name: string,
    email: string,
    password: string
}

export interface RegisterUserUseCaseResponse {
    user: User
}
