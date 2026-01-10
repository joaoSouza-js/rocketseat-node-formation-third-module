import { prisma } from "@/infra/prisma";
import type { Gym, GymRepository, RegisterGym } from "../gym-repository";


export class prismaGymsRepositories implements GymRepository {
    async create(gym: RegisterGym): Promise<Gym> {
        await prisma.gym.create({
            data: gym
        })
        return gym
    }
    async findById(id: string): Promise<Gym | null> {
        const gym = await prisma.gym.findFirst({
            where: {
                id: id
            }
        })

        return gym

    }
}