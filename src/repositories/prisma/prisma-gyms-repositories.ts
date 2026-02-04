import { prisma } from "@/infra/prisma";
import type { GymModel } from "generated/prisma/models";
import type { FindManyGym, Gym, GymRepository, RegisterGym } from "../gym-repository";


export class prismaGymsRepositories implements GymRepository {
    async create(gym: RegisterGym): Promise<Gym> {
        await prisma.gym.create({
            data: gym
        })
        return gym
    }

    private formatGymPublic(gym: GymModel): Gym {

        const gymFormatted: Gym = {
            description: gym?.description,
            id: gym.id,
            latitude: gym.latitude.toNumber(),
            longitude: gym.longitude.toNumber(),
            phone: gym.phone,
            title: gym.title

        }

        return gymFormatted
    }

    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findFirst({
            where: {
                id: id
            }
        })

        if (!gym) return null

        const gymFormatted = this.formatGymPublic(gym)

        return gymFormatted

    }

    async searchMany(props: FindManyGym): Promise<Gym[]> {
        const { limit, query, page } = props
        const gymsFounded = await prisma.gym.findMany({
            where: {
                title: query
            },
            take: limit,
            skip: (page - 1) * limit
        })

        const gymsFormatted = gymsFounded.map(this.formatGymPublic)

        return gymsFormatted
    }
}