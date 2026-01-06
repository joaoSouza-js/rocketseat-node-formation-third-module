export class EmailNotFoundedError extends Error {
    constructor(email: string) {
        super(`Email does't exist: ${email}`);
        this.name = "EmailNotFoundedError";
    }
}