import type { CheckInsRepository, RegisterCheckIn } from "@/repositories/checks-in-repositories";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-respotistories";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInNotFoundError } from "../error/check-in-not-found.error";
import { CheckInGuard } from "./check-in-guard";

describe("Check in Guard", () => {
    let checkins: CheckInsRepository
    let systemUnderTest: CheckInGuard

    beforeEach(() => {
        checkins = new CheckInMemoryRepository()
        systemUnderTest = new CheckInGuard(checkins)
    })

    it("should throw an CheckInNotFoundError when check-in not found", async () => {
        const checkinId = "checkin-id"

        await expect(systemUnderTest.ensureExists(checkinId)).rejects.instanceof(CheckInNotFoundError)

    })

    it("should return the existing check-in for a valid checkinId", async () => {
        const checkIn: RegisterCheckIn = {
            gymId: "gym-id",
            id: "checkin-id",
            userId: "user-id",
        }

        const existCheckIn = await checkins.create(checkIn)

        const response = await systemUnderTest.ensureExists(existCheckIn.id)
        expect(response.id).toEqual(expect.any(String))
    })

})