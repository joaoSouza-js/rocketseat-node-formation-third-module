import { CheckInsRepository } from "@/repositories/checks-in-repositories";
import { FetchUserCheckInHistoryCommand, FetchUserCheckInHistoryResponse } from "../dto/fetch-user-check-in-hitory";
import { UserGuard } from "../guards/user-guard";

interface Repositories {
    checkIns: CheckInsRepository;
}

interface FetchUserCheckInHistoryUseCaseDeps {
    repositories: Repositories;
    guards: { userGuard: UserGuard }
}

export class FetchUserCheckInHistoryUseCase {
    private checkIns: CheckInsRepository
    private userGuard: UserGuard
    constructor(deps: FetchUserCheckInHistoryUseCaseDeps) {
        this.checkIns = deps.repositories.checkIns
        this.userGuard = deps.guards.userGuard
    }
    async execute(input: FetchUserCheckInHistoryCommand): Promise<FetchUserCheckInHistoryResponse> {

        await this.userGuard.ensureExists(input.userId)
        const userCheckInHistory = await this.checkIns.getUserCheckInsHistory({
            userId: input.userId,
            limit: input.limit,
            page: input.page
        })

        return {
            checkIns: userCheckInHistory
        }
    }
}