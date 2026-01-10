import { GetUserProfileCommand, GetUserProfileCommandResponse } from "@/application/dto/user-dto/get-user-profile";
import { PublicUserDTO } from "@/application/dto/user-dto/public-user.dto";
import { UserNotFoundError } from "@/application/error/user-not-found.error";
import { UsersRepository } from "@/repositories/users-repository";

export class getUserProfileUseCase {
    constructor(private readonly users: UsersRepository) { }

    async execute(input: GetUserProfileCommand): Promise<GetUserProfileCommandResponse> {
        const user = await this.users.findUserById(input.id)
        if (!user) {
            throw new UserNotFoundError(input.id)
        }
        const publicUser: PublicUserDTO = {
            email: user.email,
            id: user.id,
            name: user.name
        }

        return {
            user: publicUser
        }

    }
}