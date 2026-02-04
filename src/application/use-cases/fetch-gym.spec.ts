import { GymRepository } from "@/repositories/gym-repository";
import { gymInMemoryRepository } from "@/repositories/in-memory/in-memory-gym-repositories";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { UserGuard } from "../guards/user-guard";
import { FetchGymUseCase } from "./fetch-gym";

describe("fetch gym  use case", () => {
    let gyms: GymRepository
    let users: UsersRepository
    let systemUnderTest: FetchGymUseCase
    let userGuard: UserGuard
    let user: User

    beforeEach(async () => {
        users = new inMemoryUserRepositories()
        gyms = new gymInMemoryRepository()
        userGuard = new UserGuard(users)
        systemUnderTest = new FetchGymUseCase({
            guards: {
                userGuard: userGuard
            },
            repositories: {
                gyms: gyms,
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


    it("should return the gyms by name", async () => {
        const gymNames = [
            "Iron Palace",
            "Titan Fitness",
            "Beast Mode Gym",
            "Power House",
            "Alpha Strength",
            "Steel Core",
            "Warrior Lab",
            "Prime Athletics",
        ];

        const gymPromises = Array.from({ length: 8 }, (_, index) => {
            return gyms.create({
                description: "description",
                id: `gym-{${8}}`,
                latitude: 0,
                longitude: 0,
                phone: "phone",
                title: gymNames[index]
            })
        })


        await Promise.all(gymPromises)

        const gymName = gymNames[0]

        const response = await systemUnderTest.execute({
            limit: 8,
            page: 1,
            query: gymName,
            userid: user.id
        })



        expect(response.gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: gymName }),

            ])
        )
    })

    it("should not return a gym ", async () => {
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

        const response = await systemUnderTest.execute({
            limit: 10,
            page: 1,
            query: "gym-not-found",
            userid: user.id
        })

        expect(response.gyms).toHaveLength(0)
    })

    it("should be able to fetch gyms with pagination", async () => {
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

        const response = await systemUnderTest.execute({
            limit: 4,
            page: 2,
            query: "gym",
            userid: user.id
        })

        expect(response.gyms).toHaveLength(4)
        expect(response.gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ title: "gym-4" }),
            ])
        )
    })




})