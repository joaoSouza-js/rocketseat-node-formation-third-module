import { prisma } from "@/infra/prisma";
import type { GymModel } from "generated/prisma/models";
import type { FindManyGym, FindManyNearbyGym, Gym, GymRepository, RegisterGym } from "../gym-repository";


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

    private findGymsWithinHundredKilometers(
        userLat: number,
        userLng: number
    ): Promise<Gym[]> {

        const TEN_KM_IN_METERS = 100000
        return prisma.$queryRaw<Gym[]>`
            SELECT id, title, "latitude", "longitude"
            FROM "Gym"
            WHERE ST_DistanceSphere(
            ST_MakePoint("longitude", "latitude"),
            ST_MakePoint(${userLng}, ${userLat})
            ) <= ${TEN_KM_IN_METERS}
        `;
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

    async findManyNearby(props: FindManyNearbyGym): Promise<Gym[]> {
        const gyms = await this.findGymsWithinHundredKilometers(props.coordinate.latitude, props.coordinate.longitude)
        return gyms
    }
}