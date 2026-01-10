export class UserNotFoundedError extends Error {
    constructor(id: string) {
        super(`User not founded: ${id}`);
        super.name = "UserNotFoundedError";
    }
}