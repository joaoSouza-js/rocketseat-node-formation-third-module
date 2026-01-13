import { ApplicationError } from "./application-error";

export class GymNotFoundError extends ApplicationError {
    public readonly statusCode = 404

    constructor(id: string) {
        super(`Gym not Found: ${id}`);
        super.name = "GymNotFoundError";
    }
}