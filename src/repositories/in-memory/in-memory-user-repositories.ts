import type { RegisterUser, User, UsersRepository } from "@/repositories/users-repository";

export class inMemoryUserRepositories implements UsersRepository {
    users: User[] = []

    create(user: RegisterUser): Promise<User> {
        this.users.push(user)
        return Promise.resolve(user)
    }

    userEmailExists(email: string): Promise<boolean> {
        const userExist = this.users.find(user => user.email === email)
        return Promise.resolve(!!userExist)
    }

}