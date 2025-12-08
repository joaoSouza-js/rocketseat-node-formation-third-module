import type { Hasher } from "@/application/port/hasher"
import { EmailAlreadyUsedError } from "@/domain/error/email-already-used.error"
import type { UsersRepository } from "@/repositories/users-repository"

interface User {
    name: string,
    email: string,
    password: string
}


export class RegisterUserUseCase {

    constructor(private userRepository: UsersRepository, private hasher: Hasher) { }

    async execute(user: User) {
        const userExist = await this.userRepository.userEmailExists(user.email)

        if (userExist) {
            throw new EmailAlreadyUsedError(user.email)
        }

        const hashedPassword = await this.hasher.hash(user.password)

        await this.userRepository.create({
            name: user.name,
            email: user.email,
            password_hash: hashedPassword
        })
    }

}

