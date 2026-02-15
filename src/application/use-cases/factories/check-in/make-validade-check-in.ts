import { CheckInGuard } from "@/application/guards/check-in-guard";
import { UserGuard } from "@/application/guards/user-guard";
import { DayjsTimeExpiration } from "@/infra/time-expiration/day-js-time-expiration";
import { PrismaCheckInRepositories } from "@/repositories/prisma/prisma-checkin-repositories";
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { ValidateCheckInUseCase } from "../../validate-check-in";

export function makeValidateCheckInUseCase() {
    const checkIns = new PrismaCheckInRepositories();
    const users = new prismaUsersRepositories();
    const userGuard = new UserGuard(users);
    const timeExpiration = new DayjsTimeExpiration()
    const checkInGuard = new CheckInGuard(checkIns);
    const validateCheckInUseCase = new ValidateCheckInUseCase({
        repositories: { checkIns },
        guards: { userGuard, checkInGuard },
        services: { timeExpiration }
    });
    return validateCheckInUseCase;
}