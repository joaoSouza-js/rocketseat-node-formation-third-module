import { ApplicationError } from "./application-error";

export class BadRequestError extends ApplicationError {
    public readonly statusCode = 400

    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}