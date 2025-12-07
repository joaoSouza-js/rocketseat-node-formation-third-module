type RegisterUser = {
    name: string
    email: string
    password: string
}



export class usersRepository {
    async registerUser(user: RegisterUser) { }
}