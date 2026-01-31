import { PrismaCheckInRepositories } from "@/repositories/prisma/prisma-checkin-repositories"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { GetUserCheckInAmountUseCase } from "../../get-user-check-in-amount"

export function makeGetUserCheckInAmountUseCase() {
    const checkIns = new PrismaCheckInRepositories()
    const users = new prismaUsersRepositories()
    const getUserCheckInAmountUseCase = new GetUserCheckInAmountUseCase({ repositories: { checkIns, users } })
    return getUserCheckInAmountUseCase
}