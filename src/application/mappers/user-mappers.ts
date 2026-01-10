import { User } from "@/repositories/users-repository";
import { PublicUserDTO } from "../dto/user-dto/public-user.dto";

export function toPublicUserDto(user: User) {
    const publicUser: PublicUserDTO = {
        email: user.email,
        id: user.id,
        name: user.name
    }
    return publicUser
}