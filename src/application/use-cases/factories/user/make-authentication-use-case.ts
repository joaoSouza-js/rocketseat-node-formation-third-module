import { Argon2Hasher } from "@/infra/hash/argon-hasher"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { AuthenticationUseCase } from "../../user/authentication"

export function makeAuthenticationUseCase() {
    const userRepository = new prismaUsersRepositories()
    const hasher = new Argon2Hasher()

    const authenticationUseCase = new AuthenticationUseCase(userRepository, hasher)
    return authenticationUseCase
}