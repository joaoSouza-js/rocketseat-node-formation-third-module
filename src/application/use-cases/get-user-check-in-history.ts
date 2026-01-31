import { CheckInsRepository } from "@/repositories/checks-in-repositories";
import { GetUserCheckInHistoryCommand, GetUserCheckInHistoryResponse } from "../dto/get-user-check-in-hitory";
import { UserGuard } from "../guards/user-guard";

interface Repositories {
    checkIns: CheckInsRepository;
}

interface GetUserCheckInHistoryUseCaseDeps {
    repositories: Repositories;
    guards: { userGuard: UserGuard }
}

export class GetUserCheckInHistoryUseCase {
    private checkIns: CheckInsRepository
    private userGuard: UserGuard
    constructor(deps: GetUserCheckInHistoryUseCaseDeps) {
        this.checkIns = deps.repositories.checkIns
        this.userGuard = deps.guards.userGuard
    }
    async execute(input: GetUserCheckInHistoryCommand): Promise<GetUserCheckInHistoryResponse> {

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