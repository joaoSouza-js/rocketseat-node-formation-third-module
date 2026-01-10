import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { getUserProfileUseCase } from "../../user/get-user-profile";

export function makeGetUserProfileUseCase() {
    const users = new prismaUsersRepositories()
    const getProfileUseCase = new getUserProfileUseCase(users)
    return getProfileUseCase
}