import type { RegisterUserCommand, RegisterUserUseCaseResponse } from "@/application/dto/user-dto/register-user"
import { EmailAlreadyUsedError } from "@/application/error/email-not-found.error"
import type { Hasher } from "@/application/port/hasher"
import type { IdGenerator } from "@/application/port/id-generator"
import type { UsersRepository } from "@/repositories/users-repository"

export class RegisterUserUseCase {

    constructor(private userRepository: UsersRepository, private hasher: Hasher, private idGenerator: IdGenerator) { }

    async execute(input: RegisterUserCommand): Promise<RegisterUserUseCaseResponse> {
        const userExist = await this.userRepository.findUserByEmail(input.email)

        if (userExist) {
            throw new EmailAlreadyUsedError(input.email)
        }

        const hashedPassword = await this.hasher.hash(input.password)

        const userCreated = await this.userRepository.create({
            id: this.idGenerator.next(),
            name: input.name,
            email: input.email,
            password_hash: hashedPassword
        })
        return { user: userCreated }
    }

}

