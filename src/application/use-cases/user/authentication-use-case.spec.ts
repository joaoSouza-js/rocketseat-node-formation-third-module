import { RegisterAuthenticationCommand } from "@/application/dto/user-dto/authentication";
import { UserCredentialsError } from "@/application/error/user-credentials-error";
import { Hasher } from "@/application/port/hasher";
import { hashMock } from "@/infra/hash/hash-mock";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import { User, UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticationUseCase } from "./authentication-use-case";

describe("authentication use case", () => {
    let users: UsersRepository
    let hash: Hasher
    let systemUnderTest: AuthenticationUseCase

    beforeEach(() => {
        users = new inMemoryUserRepositories()
        hash = new hashMock()
        systemUnderTest = new AuthenticationUseCase(users, hash)
    })

    it("should not be able authenticate  if user doesn't exist", async () => {
        const authenticationCommand: RegisterAuthenticationCommand = {
            email: "joedeo@gmail.com",
            password: "123456"
        }

        await expect(systemUnderTest.execute(authenticationCommand)).rejects.instanceOf(UserCredentialsError)
    })

    it("should not be able be able to authenticate if password din't match with hash ", async () => {
        const userEmail = "joedoe@gmail.com"
        const userPassword = "12364564"
        const hashedPassword = await hash.hash(userPassword)

        const user: User = {
            email: userEmail,
            id: "id-test",
            name: "joe",
            password_hash: hashedPassword
        }

        await users.create(user)

        const authenticationCommand: RegisterAuthenticationCommand = {
            email: userEmail,
            password: "wrong password",
        }


        await expect(() => {
            return systemUnderTest.execute(authenticationCommand)

        }).rejects.instanceOf(UserCredentialsError)
    })

    it("should authenticate user", async () => {
        const userEmail = "joedoe@gmail.com"
        const userPassword = "12364564"
        const hashedPassword = await hash.hash(userPassword)

        const user: User = {
            email: userEmail,
            id: "id-test",
            name: "joe",
            password_hash: hashedPassword
        }

        await users.create(user)

        const authenticationCommand: RegisterAuthenticationCommand = {
            email: userEmail,
            password: userPassword
        }

        const response = await systemUnderTest.execute(authenticationCommand)

        expect(response.user.id).toEqual(expect.any(String))


    })
})