import { UserGuard } from "@/application/guards/user-guard"
import { prismaGymsRepositories } from "@/repositories/prisma/prisma-gyms-repositories"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { FetchGymUseCase } from "../fetch-gym"

export function makeFetchGymUseCase() {
    const gyms = new prismaGymsRepositories()
    const users = new prismaUsersRepositories()
    const userGuard = new UserGuard(users)
    const fetchGymsUseCase = new FetchGymUseCase({
        repositories: {
            gyms,
        },
        guards: {
            userGuard
        }
    })
    return fetchGymsUseCase
}