import { PublicUserDTO } from "./public-user.dto"

export interface GetUserProfileCommand {
    id: string
}

export interface GetUserProfileCommandResponse {
    user: PublicUserDTO
}