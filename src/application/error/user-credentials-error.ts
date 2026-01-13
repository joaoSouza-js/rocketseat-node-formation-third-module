import { ApplicationError } from "./application-error"

export class UserCredentialsError extends ApplicationError {
    public readonly statusCode = 401

    constructor() {
        super("Credentials are incorrect")
        this.name = 'UserCredentialsError'
    }
}