export class GymNotFoundError extends Error {
    constructor(id: string) {
        super(`Gym not Found: ${id}`);
        super.name = "GymNotFoundError";
    }
}