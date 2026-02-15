import { FakeDistanceCalculator } from "@/infra/gelocation-calculator/fake-geolocation-distance";
import { IdGeneratorMock } from "@/infra/id-generator/id-generator-mock";
import { GymRepository } from "@/repositories/gym-repository";
import { gymInMemoryRepository } from "@/repositories/in-memory/in-memory-gym-repositories";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, it } from "vitest";
import { UserGuard } from "../guards/user-guard";
import { Coordinate, DistanceCalculator } from "../port/distance-calculator";
import { IdGenerator } from "../port/id-generator";
import { FetchNearbyGymUseCase } from "./fetch-nearby-gym";

describe("Fetch nearby gym use case", () => {
    let users: UsersRepository
    let gyms: GymRepository
    let userGuard: UserGuard
    let idGenerator: IdGenerator
    let distanceCalculator: DistanceCalculator
    let systemUnderTest: FetchNearbyGymUseCase
    let user: User
    beforeEach(async () => {
        users = new inMemoryUserRepositories()
        gyms = new gymInMemoryRepository()
        idGenerator = new IdGeneratorMock()
        userGuard = new UserGuard(users)
        distanceCalculator = new FakeDistanceCalculator(30)
        systemUnderTest = new FetchNearbyGymUseCase({
            repositories: {
                gyms,
            },
            guards: {
                userGuard
            }
        })
        const userToCreate = {
            email: "joedoe@gmail.com",
            id: "id-test",
            name: "joe",
            password_hash: "12364564",
        }

        user = await users.create(userToCreate)
    })



    it("should able to see nearby gyms", async () => {
        const gymsCoordinates: Coordinate[] = [
            {
                latitude: 0,
                longitude: 0
            }
        ]
        const gymPromises = Array.from({ length: 8 }, (_, index) => {
            return gyms.create({
                description: "description",
                id: `gym-{${8}}`,
                latitude: 0,
                longitude: 0,
                phone: "phone",
                title: `gym-${index}`
            })
        })

        await Promise.all(gymPromises)
    })





})