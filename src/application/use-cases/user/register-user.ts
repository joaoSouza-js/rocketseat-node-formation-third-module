import { EmailAlreadyUsedError } from "@/domain/error/email-already-used.error"
import { Argon2Hasher } from "@/infra/hash/argon-hasher"
import { prismaUsersRepositories } from "@/repositories/prisma-users-repositories"

interface RegisterUser {
    name: string,
    email: string,
    password: string
}

export async function registerUser(user: RegisterUser) {
    const prismaUsersRepository = new prismaUsersRepositories()
    const userExist = await prismaUsersRepository.userEmailExists(user.email)
    if (userExist) {
        throw new EmailAlreadyUsedError(user.email)
    }

    const hashedPassword = await Argon2Hasher().hash(user.password)

    await prismaUsersRepository.createUser({
        name: user.name,
        email: user.email,
        password_hash: hashedPassword
    })
}