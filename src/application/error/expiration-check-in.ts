import { ApplicationError } from "./application-error";

export class ExpirationCheckInError extends ApplicationError {
    public readonly statusCode = 404

    constructor(checkInId: string) {
        super(`Check-in expired ${checkInId}`);
        this.name = "ExpirationCheckInError";

    }
}