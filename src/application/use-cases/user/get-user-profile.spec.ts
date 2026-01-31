import { UserNotFoundError } from "@/application/error/user-not-found.error";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { getUserProfileUseCase } from "./get-user-profile";

describe("get profile use case", () => {
    let users: UsersRepository
    let systemUnderTest: getUserProfileUseCase

    beforeEach(() => {
        users = new inMemoryUserRepositories()
        systemUnderTest = new getUserProfileUseCase(users)
    })

    it("should fail to retrieve user profile if the user does not exist", async () => {
        const userId = "oids"
        await expect(systemUnderTest.execute({ id: userId })).rejects.instanceOf(UserNotFoundError)
    })

    it("should be able to show the user", async () => {
        const userEmail = "joedoe@gmail.com"
        const userPassword = "12364564"


        const user: User = {
            email: userEmail,
            id: "id-test",
            name: "joe",
            password_hash: userPassword
        }

        const userCreated = await users.create(user)

        const userProfile = await systemUnderTest.execute({ id: userCreated.id })

        expect(userProfile.user.id).toEqual(expect.any(String))
    })
})