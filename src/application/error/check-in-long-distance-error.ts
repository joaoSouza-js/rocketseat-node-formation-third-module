export class CheckInLongDistanceError extends Error {
    constructor() {
        super(`You can only check in at a maximum of 100 meters from the gym.`)
        this.name = "CheckInLongDistanceError"
    }
}