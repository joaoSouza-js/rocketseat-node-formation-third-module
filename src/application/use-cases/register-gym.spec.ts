import type { RegisterGymCommand } from "@/application/dto/register-gym"
import { RoleNotAllowedError } from "@/application/error/role-not-allowed-error"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { UserGuard } from "@/application/guards/user-guard"
import { RegisterGymUseCase } from "@/application/use-cases/register-gym"
import { gymInMemoryRepository } from "@/repositories/in-memory/in-memory-gym-repositories"
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories"
import type { RegisterUser } from "@/repositories/users-repository"
import { IdGenerator } from "../port/id-generator"

describe("Register gym use case", () => {
    let gymsRepository: gymInMemoryRepository
    let usersRepository: inMemoryUserRepositories

    let userGuard: UserGuard
    let idGenerator: IdGenerator

    let sut: RegisterGymUseCase

    beforeEach(async () => {
        gymsRepository = new gymInMemoryRepository()
        usersRepository = new inMemoryUserRepositories()

        userGuard = new UserGuard(usersRepository)
        idGenerator = {
            next: vi.fn().mockReturnValue("id-test"),
        }


        sut = new RegisterGymUseCase({
            repositories: {
                gyms: gymsRepository,
            },
            guards: {
                userGuard,
            },
            services: {
                idGenerator,
            },
        })
    })

    it("should allow ADMIN to create a gym", async () => {
        const adminUser: RegisterUser = {
            id: "admin-id",
            name: "Admin",
            email: "admin@test.com",
            password_hash: "123456",
            role: "ADMIN",
        }



        await usersRepository.create(adminUser)

        const command: RegisterGymCommand = {
            userId: adminUser.id,
            gym: {
                title: "My Gym",
                description: "Best gym",
                phone: "999999999",
                latitude: 10,
                longitude: 20,
            },
        }
        const idGeneratorSpy = vi.spyOn(idGenerator, "next")

        const result = await sut.execute(command)

        expect(result.gym.id).toBeDefined()
        expect(result.gym.title).toBe("My Gym")

        expect(idGeneratorSpy).toHaveBeenCalledOnce()

    })

    it("should not allow USER to create a gym", async () => {
        const normalUser: RegisterUser = {
            id: "user-id",
            name: "User",
            email: "user@test.com",
            password_hash: "123456",
            role: "USER",
        }

        await usersRepository.create(normalUser)


        const command: RegisterGymCommand = {
            userId: normalUser.id,
            gym: {
                title: "My Gym",
                description: "Best gym",
                phone: "999999999",
                latitude: 10,
                longitude: 20,
            },
        }

        await expect(() => sut.execute(command)).rejects.toBeInstanceOf(
            RoleNotAllowedError,
        )

    })
})
