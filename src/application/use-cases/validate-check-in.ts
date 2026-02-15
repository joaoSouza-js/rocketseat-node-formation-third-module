import type { ValidateCheckInCommand } from "@/application/dto/fetch-nearby-gym.d copy"
import type { UserGuard } from "@/application/guards/user-guard"
import type { CheckInsRepository } from "@/repositories/checks-in-repositories"
import { ExpirationCheckInError } from "../error/expiration-check-in"
import type { CheckInGuard } from "../guards/check-in-guard"
import { TimeExpiration } from "../port/time-expiration"

interface Repositories {
    checkIns: CheckInsRepository
}

interface Guards {
    userGuard: UserGuard,
    checkInGuard: CheckInGuard
}

interface Services {
    timeExpiration: TimeExpiration
}

interface ValidateCheckInUseCaseDeps {
    repositories: Repositories
    guards: Guards
    services: Services
}


export class ValidateCheckInUseCase {
    checkIns: CheckInsRepository
    useGuard: UserGuard
    checkInGuard: CheckInGuard
    timeExpiration: TimeExpiration
    constructor(deps: ValidateCheckInUseCaseDeps) {
        this.checkIns = deps.repositories.checkIns
        this.useGuard = deps.guards.userGuard
        this.checkInGuard = deps.guards.checkInGuard
        this.timeExpiration = deps.services.timeExpiration
    }

    async execute(input: ValidateCheckInCommand): Promise<void> {
        await this.useGuard.ensureExists(input.userId)
        const checkIn = await this.checkInGuard.ensureExists(input.checkInId)
        const expirationInMinutes = 30
        const checkInExpired = this.timeExpiration.isExpiredAfterTTL(checkIn.createdAt, expirationInMinutes)
        if (checkInExpired) {
            throw new ExpirationCheckInError(checkIn.id)
        }
        await this.checkIns.validateCheckIn(checkIn.id)
    }

}

