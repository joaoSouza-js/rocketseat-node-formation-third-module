import type { User } from "@/repositories/users-repository"

export interface RegisterAuthenticationCommand {
    email: string
    password: string
}
export interface RegisterAuthenticationCommandResponse {
    user: User
}

