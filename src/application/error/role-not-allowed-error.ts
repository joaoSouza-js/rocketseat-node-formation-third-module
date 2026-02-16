import type { UserRole } from "@/repositories/users-repository";
import { ApplicationError } from "./application-error";

export class RoleNotAllowedError extends ApplicationError {
    statusCode = 403
    constructor(role: UserRole) {
        super(`you must be ${role} to perform this action`);
        this.name = "RoleNotAllowedError";
    }
}