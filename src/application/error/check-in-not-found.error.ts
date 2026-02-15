import { ApplicationError } from "./application-error";

export class CheckInNotFoundError extends ApplicationError {
    public readonly statusCode = 409

    constructor(checkinId: string) {
        super(`Check-in not Found: ${checkinId}`);
        this.name = "CheckInNotFoundError";

    }
}