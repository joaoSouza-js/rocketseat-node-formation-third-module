import { UserGuard } from "@/application/guards/user-guard"
import { prismaGymsRepositories } from "@/repositories/prisma/prisma-gyms-repositories"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { FetchNearbyGymUseCase } from "../fetch-nearby-gym"

export function makeFetchNearbyGymUseCase() {
    const gyms = new prismaGymsRepositories()
    const users = new prismaUsersRepositories()
    const userGuard = new UserGuard(users)
    const fetchNearbyGymUseCase = new FetchNearbyGymUseCase({
        repositories: {
            gyms
        },
        guards: {
            userGuard
        }
    })
    return fetchNearbyGymUseCase
}