import { GymRepository } from "@/repositories/gym-repository";
import { FetchGymsCommand, FetchGymsResponse } from "../dto/fetch-gyms";
import { UserGuard } from "../guards/user-guard";

interface Repositories {
    gyms: GymRepository
}

interface Guards {
    userGuard: UserGuard
}


type fetchGymUseCaseDeps = {
    repositories: Repositories
    guards: Guards
}

export class FetchGymUseCase {
    private gyms: GymRepository
    private userGuard: UserGuard

    constructor(deps: fetchGymUseCaseDeps) {
        const { guards, repositories } = deps
        this.gyms = repositories.gyms
        this.userGuard = guards.userGuard
    }

    async execute(input: FetchGymsCommand): Promise<FetchGymsResponse> {
        await this.userGuard.ensureExists(input.userid)
        const gymsFounded = await this.gyms.searchMany({
            limit: input.limit,
            query: input.query,
            page: input.page
        })

        return {
            gyms: gymsFounded
        }
    }
}
