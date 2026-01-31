import { UsersRepository } from "@/repositories/users-repository"
import { UserNotFoundError } from "../error/user-not-found.error"

export class UserGuard {
    constructor(private usersRepository: UsersRepository) { }


    async ensureExists(userId: string) {
        const user = await this.usersRepository.findUserById(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        return user
    }
}