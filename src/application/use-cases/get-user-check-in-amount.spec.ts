import type { CheckInsRepository } from "@/repositories/checks-in-repositories";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-respotistories";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import type { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UserGuard } from "../guards/user-guard";
import { GetUserCheckInAmountUseCase } from "./get-user-check-in-amount";

describe("Get user check in amount use case", () => {
    let checkIns: CheckInsRepository
    let users: UsersRepository
    let systemUnderTest: GetUserCheckInAmountUseCase
    let userGuard: UserGuard
    beforeEach(() => {
        users = new inMemoryUserRepositories()
        checkIns = new CheckInMemoryRepository()
        userGuard = new UserGuard(users)
        systemUnderTest = new GetUserCheckInAmountUseCase({
            repositories: {
                checkIns: checkIns,

            },
            guards: {
                userGuard: userGuard
            }
        })

    })


    it("should return the user check in amount", async () => {
        const user: User = {
            email: "joedoe@gmail.com",
            id: "id-test",
            name: "joe",
            password_hash: "12364564",
        }


        const userCreated = await users.create(user)


        const checkInsPromises = Array.from({ length: 8 }, (_, index) => {
            return checkIns.create({
                gymId: "gym.id",
                id: `checkin-${index}`,
                userId: userCreated.id,
            })
        })


        await Promise.all(checkInsPromises)


        const checkInResponse = await systemUnderTest.execute({
            userId: userCreated.id,
        })


        expect(checkInResponse.checkIns).toBe(8)
    })
})