import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories"
import { UsersRepository } from "@/repositories/users-repository"
import { User } from "generated/prisma/client"
import { beforeEach, describe, expect, it } from "vitest"
import { UserNotFoundError } from "../error/user-not-found.error"
import { UserGuard } from "./user-guard"

describe("UserGuard", () => {

    let systemUnderTest: UserGuard
    let users: UsersRepository

    beforeEach(() => {
        users = new inMemoryUserRepositories()
        systemUnderTest = new UserGuard(users)
    })

    it("throws UserNotFoundError when user does not exist", async () => {
        await expect(systemUnderTest.ensureExists("userId")).rejects.instanceOf(UserNotFoundError)
    })

    it("returns the existing user for a valid userId", async () => {
        const user: User = {
            email: "joede@gmail.com",
            id: "id",
            name: "user",
            created_at: new Date(),
            password_hash: "password_hash"
        }
        await users.create(user)

        const response = await systemUnderTest.ensureExists(user.id)

        expect(response.id).toEqual(expect.any(String))
    })
})