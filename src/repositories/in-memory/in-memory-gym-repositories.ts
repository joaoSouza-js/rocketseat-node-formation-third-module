import { Gym, GymRepository, RegisterGym } from "../gym-repository";

export class gymInMemoryRepository implements GymRepository {
    private gyms: Gym[] = []

    create(gym: RegisterGym): Promise<Gym> {
        this.gyms.push(gym)
        return Promise.resolve(gym)
    }

    findById(id: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === id) ?? null
        return Promise.resolve(gym)
    }

}