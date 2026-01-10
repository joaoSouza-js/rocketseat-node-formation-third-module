import { Argon2Hasher } from "@/infra/hash/argon-hasher"
import { CryptoUUidGenerator } from "@/infra/id-generator/crypto-uuid-generator"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { RegisterUserUseCase } from "../../user/register-user"


export function makeRegisterUseCase() {
    const userRepository = new prismaUsersRepositories()
    const hasher = new Argon2Hasher()
    const idGenerator = new CryptoUUidGenerator()
    const registerUserUseCase = new RegisterUserUseCase(userRepository, hasher, idGenerator)

    return registerUserUseCase
}