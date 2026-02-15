import type { GymRepository } from "@/repositories/gym-repository";
import { FetchNearbyGymCommand, FetchNearbyGymResponse } from "../dto/validate-check-in";
import type { UserGuard } from "../guards/user-guard";

interface Repositories {
    gyms: GymRepository
}

interface Guards {
    userGuard: UserGuard
}


type fetchNearbyGymUseCaseDeps = {
    repositories: Repositories
    guards: Guards
}

export class FetchNearbyGymUseCase {
    private gyms: GymRepository
    private userGuard: UserGuard

    constructor(deps: fetchNearbyGymUseCaseDeps) {
        const { guards, repositories } = deps
        this.gyms = repositories.gyms
        this.userGuard = guards.userGuard
    }

    async execute(input: FetchNearbyGymCommand): Promise<FetchNearbyGymResponse> {
        await this.userGuard.ensureExists(input.userId)
        const gymsFounded = await this.gyms.findManyNearby({
            limit: input.limit,
            coordinate: input.coordinate,
            page: input.page
        })

        return {
            gyms: gymsFounded
        }
    }
}
