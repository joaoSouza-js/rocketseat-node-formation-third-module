import { ApplicationError } from "./application-error";

export class UserNotFoundError extends ApplicationError {
    readonly statusCode = 404
    constructor(id: string) {
        super(`User not Found: ${id}`);
        super.name = "UserNotFoundError";
    }
}