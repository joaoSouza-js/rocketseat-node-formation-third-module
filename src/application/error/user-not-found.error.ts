export class UserNotFoundError extends Error {
    constructor(id: string) {
        super(`User not Found: ${id}`);
        super.name = "UserNotFoundError";
    }
}