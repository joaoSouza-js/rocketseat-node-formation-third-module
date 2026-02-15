import { Minutes, TimeExpiration } from "@/application/port/time-expiration";
import dayjs from "dayjs";

export class DayjsTimeExpiration implements TimeExpiration {
    isExpiredAfterTTL(startedAt: Date | string, ttlMinutes: Minutes): boolean {
        const start = dayjs(startedAt)
        if (!start.isValid()) return true

        const maxExpiredDate = dayjs(startedAt).add(ttlMinutes, "minute")
        const isExpired = dayjs().isAfter(maxExpiredDate)
        return isExpired
    }

}
