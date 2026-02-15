import type { CheckInsRepository } from "@/repositories/checks-in-repositories";
import { CheckInNotFoundError } from "../error/check-in-not-found.error";

export class CheckInGuard {
    constructor(private checkIns: CheckInsRepository) { }

    async ensureExists(checkInId: string) {
        const checkIn = await this.checkIns.findById(checkInId)
        if (checkIn === null) {
            throw new CheckInNotFoundError(checkInId)
        }
        return checkIn
    }
}