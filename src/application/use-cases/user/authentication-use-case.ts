import type { RegisterAuthenticationCommand, RegisterAuthenticationCommandResponse } from "@/application/dto/user-dto/authentication";
import { UserCredentialsError } from "@/application/error/user-credentials-error";
import type { Hasher } from "@/application/port/hasher";
import type { UsersRepository } from "@/repositories/users-repository";


export class AuthenticationUseCase {
    constructor(private readonly users: UsersRepository, private readonly hash: Hasher) { }

    async execute(input: RegisterAuthenticationCommand): Promise<RegisterAuthenticationCommandResponse> {
        const user = await this.users.findUserByEmail(input.email)
        if (!user) {
            throw new UserCredentialsError()
        }
        const doesPasswordMatched = await this.hash.compare(input.password, user.password_hash)

        if (doesPasswordMatched === false) {
            throw new UserCredentialsError()
        }

        return {
            user
        }

    }
}