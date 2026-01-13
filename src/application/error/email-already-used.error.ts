import { ApplicationError } from "./application-error";

export class EmailNotFoundError extends ApplicationError {
    public readonly statusCode = 404

    constructor(email: string) {
        super(`Email does't exist: ${email}`);
        this.name = "EmailNotFoundError";
    }
}