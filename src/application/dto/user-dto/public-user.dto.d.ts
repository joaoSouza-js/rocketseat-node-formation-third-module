import { UserRole } from "@/repositories/users-repository";

export type PublicUserDTO = {
    id: string;
    name: string;
    email: string;
    role?: UserRole
};