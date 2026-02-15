import type { FindManyGym, FindManyNearbyGym, Gym, GymRepository, RegisterGym } from "../gym-repository";

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

    searchMany(props: FindManyGym): Promise<Gym[]> {
        const { limit, query, page } = props
        const gyms = this.gyms.filter(gym => {
            const gymNameMatch = gym.title.toLowerCase().includes(query.toLowerCase())
            return gymNameMatch
        })

        const gymsWithPagination = gyms.slice((page - 1) * limit, limit * page)

        return Promise.resolve(gymsWithPagination)
    }

    findManyNearby(props: FindManyNearbyGym): Promise<Gym[]> {

        return Promise.resolve(this.gyms)
    }
}