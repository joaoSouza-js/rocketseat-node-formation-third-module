import { UserRole } from "@/repositories/users-repository";
import { RoleNotAllowedError } from "../error/role-not-allowed-error";



export class RoleGuard {
    constructor(private role: UserRole, private readonly allowedRoles: UserRole[]) {
    }

    validate() {
        const isValid = this.allowedRoles.includes(this.role)
        if (!isValid) {
            throw new RoleNotAllowedError(this.role)
        }
    }
}