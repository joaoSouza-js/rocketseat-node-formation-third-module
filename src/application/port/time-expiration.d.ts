type Minutes = number

export interface TimeExpiration {
    /**
     * Determines whether a timestamp has expired based on a time-to-live value.
     *
     * @param startedAt - Date or ISO string representing
     *                    when the resource became active.
     *
     * @param ttlMinutes - Time-to-live in minutes.
     *                     Must be a positive number.
     *
     * @returns `true` if the current time exceeds
     *          startedAt + ttlMinutes.
     */
    isExpiredAfterTTL(
        startedAt: Date | string,
        ttlMinutes: Minutes
    ): boolean
}
