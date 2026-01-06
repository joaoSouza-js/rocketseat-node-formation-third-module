export class UserCredentialsError extends Error {
    constructor() {
        super("Credentials are incorrect")
        this.name = 'UserCredentialsError'
    }
}