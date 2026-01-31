import type { CheckInsRepository } from "@/repositories/checks-in-repositories";
import type { GetUserCheckInAmountCommand, GetUserCheckInAmountResponse } from "../dto/get-user-check-in-amount";
import { UserGuard } from "../guards/user-guard";

interface Repositories {
    checkIns: CheckInsRepository;
}

interface Guards {
    userGuard: UserGuard
}

interface GetUserCheckInAmountUseCaseDeps {
    repositories: Repositories;
    guards: Guards
}

export class GetUserCheckInAmountUseCase {
    private checkIns: CheckInsRepository
    private userGuard: UserGuard
    constructor(private readonly deps: GetUserCheckInAmountUseCaseDeps) {
        this.checkIns = deps.repositories.checkIns
        this.userGuard = deps.guards.userGuard
    }

    async execute(input: GetUserCheckInAmountCommand): Promise<GetUserCheckInAmountResponse> {
        await this.userGuard.ensureExists(input.userId)
        const userCheckIns = await this.checkIns.getUserCheckInsAmount(input.userId)
        return {
            checkIns: userCheckIns
        }
    }
}