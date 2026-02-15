import { TimeExpiration } from "@/application/port/time-expiration"

export class timeExpirationMock implements TimeExpiration {

    isExpiredAfterTTL(
        startedAt: Date | string,
        ttlMinutes: number
    ): boolean {

        const start = new Date(startedAt)

        const maxExpiredDate = new Date(
            start.getTime() + ttlMinutes * 60 * 1000
        )

        return Date.now() > maxExpiredDate.getTime()
    }
}
