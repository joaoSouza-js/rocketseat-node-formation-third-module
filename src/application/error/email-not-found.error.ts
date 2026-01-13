import { ApplicationError } from "./application-error";

export class EmailAlreadyUsedError extends ApplicationError {
    public readonly statusCode = 409

    constructor(email: string) {
        super(`Email already in use: ${email}`);
        this.name = "EmailAlreadyUsedError";

    }
}