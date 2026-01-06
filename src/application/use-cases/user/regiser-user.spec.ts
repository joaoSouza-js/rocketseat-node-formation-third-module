import type { RegisterUserCommand } from "@/application/dto/user-dto/register-user";
import { EmailAlreadyUsedError } from "@/application/error/email-not-founded.error";
import type { Hasher } from "@/application/port/hasher";
import type { IdGenerator } from "@/application/port/id-generator";
import { hashMock } from "@/infra/hash/hash-mock";
import { IdGeneratorMock } from "@/infra/id-generator/id-generator-mock";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import type { UsersRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, test } from "vitest";
import { RegisterUserUseCase, } from "./register-user";

describe("Register Use Case", () => {
    let userInMemoryRepository: UsersRepository;
    let hasher: Hasher;
    let registerUserUseCase: RegisterUserUseCase;
    let idGenerator: IdGenerator

    beforeEach(() => {
        idGenerator = new IdGeneratorMock()
        userInMemoryRepository = new inMemoryUserRepositories();
        hasher = new hashMock();
        registerUserUseCase = new RegisterUserUseCase(
            userInMemoryRepository,
            hasher,
            idGenerator
        );
    });

    test("should register a new user", async () => {
        const user: RegisterUserCommand = {
            name: "John Doe",
            email: "tes@gmail.com",
            password: "123456",
        };


        const transaction = await registerUserUseCase.execute(user);
        expect(transaction.user.id).toEqual(expect.any(String))
    });

    test("should not create user if email Exist", async () => {
        const user: RegisterUserCommand = {
            name: "John Doe",
            email: "tes@gmail.com",
            password: "123456",
        };

        await registerUserUseCase.execute(user);

        await expect(() =>
            registerUserUseCase.execute(user)
        ).rejects.toBeInstanceOf(EmailAlreadyUsedError);
    });

    test("should hash user password", async () => {
        const user: RegisterUserCommand = {
            name: "John Doe",
            email: "tes@gmail.com",
            password: "123456",
        };

        const transaction = await registerUserUseCase.execute(user)

        const isUserPasswordCorrectlyHashed = await hasher.compare(
            "123456",
            transaction.user.password_hash
        )

        expect(isUserPasswordCorrectlyHashed).toBeTruthy()
    })


})
