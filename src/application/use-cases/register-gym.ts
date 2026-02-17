import type { GymRepository } from "@/repositories/gym-repository"
import { roleAssertion } from "../authorization/role-assertion"
import type { RegisterGymCommand, RegisterGymResponse } from "../dto/register-gym"
import type { UserGuard } from "../guards/user-guard"
import type { IdGenerator } from "../port/id-generator"

interface Repositories {
    gyms: GymRepository
}

interface Guards {
    userGuard: UserGuard,

}

interface Services {
    idGenerator: IdGenerator
}

interface ValidateCheckInUseCaseDeps {
    repositories: Repositories
    guards: Guards
    services: Services

}


export class RegisterGymUseCase {
    gyms: GymRepository
    userGuard: UserGuard
    idGenerator: IdGenerator

    constructor(deps: ValidateCheckInUseCaseDeps) {
        const { guards, repositories, services } = deps
        this.gyms = repositories.gyms
        this.userGuard = guards.userGuard
        this.idGenerator = services.idGenerator
    }

    async execute(input: RegisterGymCommand): Promise<RegisterGymResponse> {
        const { gym } = input
        const user = await this.userGuard.ensureExists(input.userId)
        roleAssertion(user.role, ["ADMIN"])
        const gymCreated = await this.gyms.create({
            ...gym,
            id: this.idGenerator.next(),
        })


        return {
            gym: gymCreated
        }

    }
}