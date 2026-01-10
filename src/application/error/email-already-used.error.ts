export class EmailNotFoundError extends Error {
    constructor(email: string) {
        super(`Email does't exist: ${email}`);
        this.name = "EmailNotFoundError";
    }
}