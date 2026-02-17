import { UserRole } from "@/repositories/users-repository";
import { RoleNotAllowedError } from "../error/role-not-allowed-error";

export function roleAssertion(role: UserRole = "USER", allowedRoles: UserRole[]) {
    const isValid = allowedRoles.includes(role)

    if (isValid === false) {
        throw new RoleNotAllowedError(role)
    }
}