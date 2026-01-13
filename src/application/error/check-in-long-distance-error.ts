import { ApplicationError } from "./application-error"

export class CheckInLongDistanceError extends ApplicationError {
    public readonly statusCode = 422

    constructor() {
        super(`You can only check in at a maximum of 100 meters from the gym.`)
        this.name = "CheckInLongDistanceError"
    }
}