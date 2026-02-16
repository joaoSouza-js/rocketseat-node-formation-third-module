import type { RegisterUser, User, UsersRepository } from "@/repositories/users-repository";

export class inMemoryUserRepositories implements UsersRepository {
    users: User[] = []

    create(user: RegisterUser): Promise<User> {
        const newUser: User = { ...user, role: user.role ?? "USER" }
        this.users.push(user)
        return Promise.resolve(newUser)
    }

    findUserByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email) ?? null
        return Promise.resolve(user)
    }

    findUserById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id) ?? null
        return Promise.resolve(user)
    }


}