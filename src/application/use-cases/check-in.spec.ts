import { FakeDistanceCalculator } from "@/infra/gelocation-calculator/fake-geolocation-distance";
import { IdGeneratorMock } from "@/infra/id-generator/id-generator-mock";
import { CheckInsRepository } from "@/repositories/checks-in-repositoriest";
import { GymRepository } from "@/repositories/gym-repository";
import { CheckInMemoryRepository } from "@/repositories/in-memory/in-memory-check-respotistories";
import { gymInMemoryRepository } from "@/repositories/in-memory/in-memory-gym-repositories";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInCommand } from "../dto/check-in";
import { CheckInLongDistanceError } from "../error/check-in-long-distance-error";
import { GymNotFoundError } from "../error/gym-not-found.error";
import { UserNotFoundError } from "../error/user-not-found.error";
import { DistanceCalculator } from "../port/distance-calculator";
import { IdGenerator } from "../port/id-generator";
import { CheckInUseCase } from "./check-in";

describe("Check in use case", () => {
    let users: UsersRepository
    let gyms: GymRepository
    let checkIns: CheckInsRepository
    let idGenerator: IdGenerator
    let distanceCalculator: DistanceCalculator
    let SystemUnderTest: CheckInUseCase

    beforeEach(() => {
        users = new inMemoryUserRepositories()
        gyms = new gymInMemoryRepository()
        checkIns = new CheckInMemoryRepository()
        idGenerator = new IdGeneratorMock()
        distanceCalculator = new FakeDistanceCalculator(30)
        SystemUnderTest = new CheckInUseCase({
            repositories: {
                checkIns,
                gyms,
                users
            },
            services: {
                distanceCalculator,
                idGenerator
            }
        })
    })

    it("should throw GymNotFoundError when attempting to check in to a non-existent gym", async () => {
        const checkInCommand: CheckInCommand = {
            gymId: "gym-tes",
            latitude: 93,
            longitude: 9090,
            userId: "id-test"

        }
        await expect(SystemUnderTest.execute(checkInCommand)).rejects.instanceOf(GymNotFoundError)
    })

    it("should prevent check-in when calculated distance exceeds 100 meters", async () => {
        const gym = await gyms.create({
            title: "gym-tes",
            longitude: 93,
            latitude: 9090,
            id: idGenerator.next(),
            description: null,
            phone: null
        })

        distanceCalculator.between = vi.fn().mockReturnValue(300)
        const checkInCommand: CheckInCommand = {
            gymId: gym.id,
            latitude: 93,
            longitude: 9090,
            userId: "id-test"

        }
        await expect(SystemUnderTest.execute(checkInCommand)).rejects.instanceOf(CheckInLongDistanceError)


    })

    it("should reject check-in if the requesting user is not registered", async () => {
        const gym = await gyms.create({
            title: "gym-tes",
            longitude: 93,
            latitude: 9090,
            id: idGenerator.next(),
            description: null,
            phone: null
        })


        const checkInCommand: CheckInCommand = {
            gymId: gym.id,
            latitude: 93,
            longitude: 9090,
            userId: "id-test"

        }

        await expect(SystemUnderTest.execute(checkInCommand)).rejects.instanceOf(UserNotFoundError)
    })

    it("should persist a new check-in for a valid user at a nearby gym", async () => {
        const gym = await gyms.create({
            title: "gym-tes",
            longitude: 93,
            latitude: 9090,
            id: idGenerator.next(),
            description: null,
            phone: null
        })
        const userEmail = "joedoe@gmail.com"
        const userPassword = "12364564"

        const user: User = {
            email: userEmail,
            id: "id-test",
            name: "joe",
            password_hash: userPassword
        }
        await users.create(user)

        const checkInCommand: CheckInCommand = {
            gymId: gym.id,
            latitude: 93,
            longitude: 9090,
            userId: user.id

        }

        const response = await SystemUnderTest.execute(checkInCommand)

        expect(response.checkIn.id).toEqual(expect.any(String))
    })

})