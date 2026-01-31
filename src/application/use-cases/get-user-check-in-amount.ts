import type { CheckInsRepository } from "@/repositories/checks-in-repositories";
import type { UsersRepository } from "@/repositories/users-repository";
import type { GetUserCheckInAmountCommand, GetUserCheckInAmountResponse } from "../dto/get-user-check-in-amount";
import { UserNotFoundError } from "../error/user-not-found.error";

interface Repositories {
    users: UsersRepository;
    checkIns: CheckInsRepository;
}

interface GetUserCheckInAmountUseCaseDeps {
    repositories: Repositories;
}



export class GetUserCheckInAmountUseCase {
    constructor(private readonly deps: GetUserCheckInAmountUseCaseDeps) { }

    async execute(input: GetUserCheckInAmountCommand): Promise<GetUserCheckInAmountResponse> {
        const { repositories: { checkIns, users } } = this.deps
        const user = await users.findUserById(input.userId)
        if (!user) {
            throw new UserNotFoundError(input.userId)
        }
        const userCheckIns = await checkIns.getUserCheckInsAmount(user.id)
        return {
            checkIns: userCheckIns
        }
    }
}