import { UserGuard } from "@/application/guards/user-guard"
import { RegisterGymUseCase } from "@/application/use-cases/register-gym"
import { CryptoUUidGenerator } from "@/infra/id-generator/crypto-uuid-generator"
import { prismaGymsRepositories } from "@/repositories/prisma/prisma-gyms-repositories"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"

export function makeRegisterGymUseCase() {
    const gymRepository = new prismaGymsRepositories()
    const userRepository = new prismaUsersRepositories()

    const userGuard = new UserGuard(userRepository)

    const idGenerator = new CryptoUUidGenerator()

    const registerGymUseCase = new RegisterGymUseCase({
        repositories: {
            gyms: gymRepository,
        },
        guards: {
            userGuard,
        },
        services: {
            idGenerator,
        },
    })

    return registerGymUseCase
}
