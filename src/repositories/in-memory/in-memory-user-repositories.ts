import type { RegisterUser, User, UsersRepository } from "@/repositories/users-repository";

export class inMemoryUserRepositories implements UsersRepository {
    users: User[] = []

    create(user: RegisterUser): Promise<User> {
        this.users.push(user)
        return Promise.resolve(user)
    }

    findUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email) ?? null
        return Promise.resolve(user)
    }

}