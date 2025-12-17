export interface RegisterUserCommand {
    name: string,
    email: string,
    password: string
}

export interface RegisterUserUseCaseResponse {
    user: {
        id: string,
        name: string,
        email: string,
        password_hash: string
    }
}
