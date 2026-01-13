export abstract class ApplicationError extends Error {
    abstract readonly statusCode: number

    protected constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}
