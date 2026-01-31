import { UserGuard } from "@/application/guards/user-guard";
import { PrismaCheckInRepositories } from "@/repositories/prisma/prisma-checkin-repositories";
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { GetUserCheckInAmountUseCase } from "../../get-user-check-in-amount";

export function makeGetUserCheckInAmountUseCase() {
    const checkIns = new PrismaCheckInRepositories();
    const users = new prismaUsersRepositories();
    const userGuard = new UserGuard(users);
    const getUserCheckInAmountUseCase = new GetUserCheckInAmountUseCase({
        repositories: { checkIns },
        guards: { userGuard },
    });
    return getUserCheckInAmountUseCase;
}
