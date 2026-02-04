import { UserGuard } from "@/application/guards/user-guard";
import { PrismaCheckInRepositories } from "@/repositories/prisma/prisma-checkin-repositories";
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { FetchUserCheckInHistoryUseCase } from "../../fetch-user-check-in-history";

export function makeFetchUserCheckInHistory() {
    const users = new prismaUsersRepositories()
    const userGuard = new UserGuard(users)
    const checkIns = new PrismaCheckInRepositories()
    const useCase = new FetchUserCheckInHistoryUseCase({
        guards: {
            userGuard,
        },
        repositories: {
            checkIns: checkIns
        }
    })

    return useCase

}