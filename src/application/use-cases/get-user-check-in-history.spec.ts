import { CheckInsRepository } from "@/repositories/checks-in-repositories";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-respotistories";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UserGuard } from "../guards/user-guard";
import { GetUserCheckInHistoryUseCase } from "./get-user-check-in-history";

describe("Get user check in history use case", () => {
    let checkIns: CheckInsRepository
    let users: UsersRepository
    let systemUnderTest: GetUserCheckInHistoryUseCase
    let userGuard: UserGuard
    let user: User
    beforeEach(async () => {
        users = new inMemoryUserRepositories()
        checkIns = new CheckInMemoryRepository()
        userGuard = new UserGuard(users)
        systemUnderTest = new GetUserCheckInHistoryUseCase({
            guards: {
                userGuard: userGuard
            },
            repositories: {
                checkIns: checkIns
            }
        })

        let userToCreate = {
            email: "joedoe@gmail.com",
            id: "id-test",
            name: "joe",
            password_hash: "12364564",
        }

        user = await users.create(userToCreate)

    })


    it("should return the user check in history", async () => {

        const checkInsPromises = Array.from({ length: 8 }, (_, index) => {
            return checkIns.create({
                gymId: "gym.id",
                id: `checkin-${index}`,
                userId: user.id,
            })
        })


        await Promise.all(checkInsPromises)


        const checkInResponse = await systemUnderTest.execute({
            limit: 8,
            page: 1,
            userId: user.id
        })


        expect(checkInResponse.checkIns.length).toBe(8)
    })

    it("should return the user check in history with pagination", async () => {

        const checkInsPromises = Array.from({ length: 8 }, (_, index) => {
            return checkIns.create({
                gymId: "gym.id",
                id: `checkin-${index}`,
                userId: user.id,
            })
        })


        await Promise.all(checkInsPromises)


        const checkInResponse = await systemUnderTest.execute({
            limit: 4,
            page: 2,
            userId: user.id
        })


        expect(checkInResponse.checkIns.length).toBe(4)
    })
})