import { UserGuard } from "@/application/guards/user-guard";
import { PrismaCheckInRepositories } from "@/repositories/prisma/prisma-checkin-repositories";
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { GetUserCheckInHistoryUseCase } from "../../get-user-check-in-history";

export function makeGetUserCheckInHistory() {
    const users = new prismaUsersRepositories()
    const userGuard = new UserGuard(users)
    const checkIns = new PrismaCheckInRepositories()
    const useCase = new GetUserCheckInHistoryUseCase({
        guards: {
            userGuard,
        },
        repositories: {
            checkIns: checkIns
        }
    })

    return useCase

}